import SimpleRepo from "@/database/simple-repo";
import Course from "@/model/course";

describe("SimpleRepo", () => {

    let repo: SimpleRepo;

    beforeEach(() => {
        repo = new SimpleRepo();
    })

    test("Add course", () => {
        let course = new Course("CSE", "100", new Map());
        repo.addCourse("CSE 100", course);

        expect(repo.getCourse("CSE 100")).toBe(course);
    })

    test("Update course", () => {
        let course = new Course("CSE", "100", new Map());
        repo.addCourse("CSE 100", course);

        let updatedCourse = new Course("CSE", "100", new Map());
        repo.updateCourse("CSE 100", updatedCourse);

        expect(repo.getCourse("CSE 100")).toBe(updatedCourse);
    })

    test("Delete course", () => {
        let course = new Course("CSE", "100", new Map());
        repo.addCourse("CSE 100", course);

        repo.deleteCourse("CSE 100");

        expect(repo.getCourse("CSE 100")).toBeUndefined();
    })

    test("Filter department", () => {
        let course1 = new Course("CSE", "100", new Map());
        let course2 = new Course("CSE", "101", new Map());
        let course3 = new Course("MATH", "20C", new Map());

        repo.addCourse("CSE 100", course1);
        repo.addCourse("CSE 101", course2);
        repo.addCourse("MATH 20C", course3);

        let cseCourses = repo.filterDepartment("CSE");
        expect(cseCourses).toEqual([course1, course2]);
    })

    test("Get course count", () => {
        let course1 = new Course("CSE", "100", new Map());
        let course2 = new Course("CSE", "101", new Map());
        let course3 = new Course("MATH", "20C", new Map());

        repo.addCourse("CSE 100", course1);
        repo.addCourse("CSE 101", course2);
        repo.addCourse("MATH 20C", course3);

        expect(repo.getCourseCount()).toBe(3);
    })

    test("Fill example classes", () => {
        repo.fillExampleClasses();

        expect(repo.getCourseCount()).toBe(4);
        
        let cogsCourses = repo.filterDepartment("COGS");
        expect(cogsCourses.length).toBe(1);
        expect(cogsCourses[0].code).toBe("108");

        let mathCourses = repo.filterDepartment("MATH");
        expect(mathCourses.length).toBe(1);
        expect(mathCourses[0].code).toBe("20C");

        let cseCourses = repo.filterDepartment("CSE");
        expect(cseCourses.length).toBe(2);
        expect(cseCourses[0].code).toBe("120");
        expect(cseCourses[1].code).toBe("170");
    })
})
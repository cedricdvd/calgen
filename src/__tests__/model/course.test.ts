import Course from "@/model/course";
import CourseSection from "@/model/course-section";
import SectionInfo from "@/model/section-info";
import ExamInfo from "@/model/exam-info";

describe("Course", () => {
    let course: Course;

    beforeEach(() => {
        let lecture = new SectionInfo("A00", "MWF", "10:00-10:50", "GH", "242");

        let discussions = new Map<string, SectionInfo>();
        discussions.set('A01', new SectionInfo("A01", "W", "4:00p-4:50p", "PETER", "108"));
        discussions.set('A02', new SectionInfo("A02", "W", "5:00p-5:50p", "PODEM", "1A20"));

        let labs = new Map<string, SectionInfo>();
        labs.set('A50', new SectionInfo("A50", "Tu", "2:00p-4:50p", "WLH", "2005"));
        labs.set('A51', new SectionInfo("A51", "Th", "2:00p-4:50p", "WLH", "2005"));
        labs.set('A52', new SectionInfo("A52", "F", "2:00p-4:50p", "WLH", "2005"));

        let studio = new Map<string, SectionInfo>();
        studio.set('A60', new SectionInfo("A60", "M", "2:00p-4:50p", "WLH", "2005"));

        let midterms = [
            new ExamInfo("10/24/2024", "Th", "9:00p-9:50p", "PETER", "108"),
            new ExamInfo("11/21/2024", "Th", "9:00p-9:50p", "PETER", "108")
        ];

        let final = new ExamInfo("12/07/2024", "S", "7:00p-9:59p", "WLH", "2005");

        let section = new CourseSection("A00", lecture, discussions, labs, studio, midterms, final);

        let sections = new Map<string, CourseSection>();
        sections.set("A00", section);

        course = new Course("CSE", "100", sections);
    })

    test("Get department", () => {
        expect(course.department).toBe("CSE");
    })

    test("Get code", () => {
        expect(course.code).toBe("100");
    })

    test("Get name", () => {
        expect(course.name).toBe("CSE 100");
    })

    test("Get sections", () => {
        expect(course.sections.size).toBe(1);

        let section = course.sections.get("A00");
        expect(section?.section).toBe("A00");
    })

    test("Get section numbers", () => {
        expect(course.getSectionNumbers()).toEqual(["A00"]);
    })

    test("Get number of sections", () => {
        expect(course.getNumberOfSections()).toBe(1);
    });

    test("Get section", () => {
        expect(course.getSection("A00")?.section).toBe("A00");

        expect(course.getSection("A01")).toBeUndefined();
    })
})

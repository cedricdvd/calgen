import SimpleRepo from "@/lib/database/simple-repo";
import ICourse from "@/lib/model/courses/course-interface";
import Course from "@/lib/model/courses/course";

describe("Test SimpleRepo", () => {
  test("Test SimpleRepo Constructor", () => {
    const repo = new SimpleRepo();
    expect(repo.getAllCourses()).toEqual([]);
  });

  test("Test SimpleRepo Construct Many Courses", () => {
    const repo = new SimpleRepo([
      new Course("COGS", "108"),
      new Course("MATH", "20C"),
      new Course("CSE", "120"),
      new Course("CSE", "170"),
    ]);
    expect(repo.getAllCourses()).toEqual([
      new Course("COGS", "108").withId(0),
      new Course("MATH", "20C").withId(1),
      new Course("CSE", "120").withId(2),
      new Course("CSE", "170").withId(3),
    ]);

    repo.addCourse(new Course("CS", "101"));
    expect(repo.getAllCourses()).toEqual([
      new Course("COGS", "108").withId(0),
      new Course("MATH", "20C").withId(1),
      new Course("CSE", "120").withId(2),
      new Course("CSE", "170").withId(3),
      new Course("CS", "101").withId(4),
    ]);
  });

  test("Test SimpleRepo Add Course", () => {
    const repo = new SimpleRepo();
    const course = new Course("CS", "101");
    const addedCourse = repo.addCourse(course);
    expect(repo.getAllCourses()).toEqual([addedCourse]);
    expect(addedCourse).toEqual(course.withId(0));
  });

  test("Test SimpleRepo Get Course By Id", () => {
    const repo = new SimpleRepo();
    const course = new Course("CS", "101");
    const addedCourse = repo.addCourse(course);
    expect(repo.getCourseById(0)).toEqual(addedCourse);
    expect(repo.getCourseById(1)).toBeNull();
  });

  test("Test SimpleRepo Add Multiple Courses", () => {
    const repo = new SimpleRepo();
    const course1 = new Course("CS", "101");
    const course2 = new Course("CS", "102");
    const addedCourse1 = repo.addCourse(course1);
    const addedCourse2 = repo.addCourse(course2);
    expect(repo.getAllCourses()).toEqual([addedCourse1, addedCourse2]);
    expect(addedCourse1).toEqual(course1.withId(0));
    expect(addedCourse2).toEqual(course2.withId(1));
    expect(repo.getCourseById(0)).toEqual(addedCourse1);
    expect(repo.getCourseById(1)).toEqual(addedCourse2);
    expect(repo.getCourseById(2)).toBeNull();
  });

  test("Test SimpleRepo Fill Example Courses", () => {
    const repo: SimpleRepo = new SimpleRepo();
    repo.fillExampleCourses();
    expect(repo.getAllCourses().length).toBe(4);

    const course1: ICourse | null = repo.getCourseById(0);
    if (course1) {
      expect(course1.courseName).toBe("COGS 108");
      expect(course1.sections.length).toBe(2);

      expect(course1.sections[0].activites.length).toBe(8);
      expect(course1.sections[0].exams.length).toBe(1);

      expect(course1.sections[1].activites.length).toBe(8);
      expect(course1.sections[1].exams.length).toBe(1);
    } else {
      fail("COGS 108 not found");
    }

    const course2: ICourse | null = repo.getCourseById(1);
    if (course2) {
      expect(course2.courseName).toBe("MATH 20C");
      expect(course2.sections.length).toBe(3);

      expect(course2.sections[0].activites.length).toBe(5);
      expect(course2.sections[0].exams.length).toBe(3);

      expect(course2.sections[1].activites.length).toBe(5);
      expect(course2.sections[1].exams.length).toBe(3);

      expect(course2.sections[2].activites.length).toBe(5);
      expect(course2.sections[2].exams.length).toBe(3);
    } else {
      fail("MATH 20C not found");
    }

    const course3: ICourse | null = repo.getCourseById(2);
    if (course3) {
      expect(course3.courseName).toBe("CSE 120");
      expect(course3.sections.length).toBe(1);

      expect(course3.sections[0].activites.length).toBe(2);
      expect(course3.sections[0].exams.length).toBe(1);
    } else {
      fail("CSE 120 not found");
    }

    const course4: ICourse | null = repo.getCourseById(3);
    if (course4) {
      expect(course4.courseName).toBe("CSE 170");
      expect(course4.sections.length).toBe(1);

      expect(course4.sections[0].activites.length).toBe(8);
      expect(course4.sections[0].exams.length).toBe(1);
    } else {
      fail("CSE 170 not found");
    }

    const course = new Course("CS", "101");
    repo.addCourse(course);
    expect(repo.getAllCourses().length).toBe(5);
    expect(repo.getCourseById(4)).toEqual(course.withId(4));
  });

  test("Test SimpleRepo Clear", () => {
    const repo = new SimpleRepo();
    repo.fillExampleCourses();
    repo.clear();
    expect(repo.getAllCourses()).toEqual([]);
    expect(repo.getCourseById(0)).toBeNull();

    const course = new Course("CS", "101");
    repo.addCourse(course);
    expect(repo.getAllCourses().length).toBe(1);
    expect(repo.getCourseById(0)).toEqual(course.withId(0));
  });

  describe("Test SimpleRepo With Filled Courses", () => {
    const repo: SimpleRepo = new SimpleRepo();

    beforeEach(() => {
      repo.clear();
      repo.fillExampleCourses();
    });

    test("Test SimpleRepo Get Departments", () => {
      expect(repo.getDepartments()).toEqual(["COGS", "MATH", "CSE"]);
    });

    test("Test SimpleRepo Get Courses By Department", () => {
      const cogsCourses = repo
        .getCoursesByDepartment("COGS")
        .map((course) => course.courseName);
      const mathCourses = repo
        .getCoursesByDepartment("MATH")
        .map((course) => course.courseName);
      const cseCourses = repo
        .getCoursesByDepartment("CSE")
        .map((course) => course.courseName);

      expect(cogsCourses).toEqual(["COGS 108"]);
      expect(mathCourses).toEqual(["MATH 20C"]);
      expect(cseCourses).toEqual(["CSE 120", "CSE 170"]);
    });

    test("Test SimpleRepo Get Course Numbers", () => {
      expect(repo.getCourseNumbers("COGS")).toEqual(["108"]);
      expect(repo.getCourseNumbers("MATH")).toEqual(["20C"]);
      expect(repo.getCourseNumbers("CSE")).toEqual(["120", "170"]);
    });

    test("Test SimpleRepo Update Course", () => {
      const course = new Course("CSE", "170");
      repo.updateCoures(3, course);
      expect(repo.getCourseById(3)).toEqual(course.withId(3));
    });

    test("Test SimpleRepo Delete Course", () => {
      repo.deleteCourse(3);
      expect(repo.getAllCourses().length).toBe(3);
      expect(repo.getCourseById(3)).toBeNull();

      repo.addCourse(new Course("CSE", "170"));
      expect(repo.getAllCourses().length).toBe(4);
      expect(repo.getCourseById(3)).toBeNull();
      expect(repo.getCourseById(4)).not.toBeNull();
    });
  });
});

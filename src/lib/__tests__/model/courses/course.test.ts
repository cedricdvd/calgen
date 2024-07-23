import Course from "@/lib/model/courses/course";
import Section from "@/lib/model/sections/section";
import Lecture from "@/lib/model/activities/activity-types/lecture";
import Final from "@/lib/model/exams/exam-types/final";

describe("Test Course", () => {
  test("Test Course Constructor", () => {
    const course = new Course("CS", "101");
    expect(course.department).toBe("CS");
    expect(course.courseNum).toBe("101");
    expect(course.courseName).toBe("CS 101");
    expect(course.sections).toEqual([]);
    expect(course.id).toBe(-1);
  });

  test("Test Course Constructor with ID and Sections", () => {
    const section = new Section("001");
    const course = new Course("CS", "101", [section], 1);
    expect(course.department).toBe("CS");
    expect(course.courseNum).toBe("101");
    expect(course.courseName).toBe("CS 101");
    expect(course.sections).toEqual([section]);
    expect(course.id).toBe(1);
  });

  test("Test Course Getters", () => {
    const course = new Course("CS", "101", [], 1);
    expect(course.department).toBe("CS");
    expect(course.courseNum).toBe("101");
    expect(course.courseName).toBe("CS 101");
    expect(course.sections).toEqual([]);
    expect(course.id).toBe(1);
  });

  test("Test Course Add Section", () => {
    const course = new Course("CS", "101", [], 1);
    const section = new Section("001");
    course.addSection(section);
    expect(course.sections).toEqual([section]);
  });

  test("Test Course Add Section with Activity and Exam", () => {
    const course = new Course("CS", "101", [], 1);
    const section = new Section("001");
    const activity = new Lecture("001", "MWF", "9:00AM-10:00AM", "CSB", "130");
    const exam = new Final("12/12/2021", "S", "12:00PM", "CSB", "130");
    section.addActivity(activity);
    section.addExam(exam);
    course.addSection(section);
    expect(course.sections).toEqual([section]);
  });

  test("Test Course With Id", () => {
    const course = new Course("CS", "101", [], 1);
    const newCourse = course.withId(2);
    expect(newCourse.department).toBe("CS");
    expect(newCourse.courseNum).toBe("101");
    expect(newCourse.courseName).toBe("CS 101");
    expect(newCourse.sections).toEqual([]);
    expect(newCourse.id).toBe(2);
  });
});

import Section from "@/lib/model/sections/section";
import Lecture from "@/lib/model/activities/activity-types/lecture";
import Final from "@/lib/model/exams/exam-types/final";

describe("Test Section", () => {
  test("Test Section Getters", () => {
    const section = new Section("001");
    expect(section.sectionNum).toBe("001");
    expect(section.activites).toEqual([]);
    expect(section.exams).toEqual([]);
  });

  test("Test Section Add Activity", () => {
    const section = new Section("A00");
    const activity = new Lecture("A00", "MWF", "9:00AM-10:00AM", "CSB", "130");
    section.addActivity(activity);
    expect(section.activites).toEqual([activity]);
  });

  test("Test Section Add Exam", () => {
    const section = new Section("A00");
    const exam = new Final(
      "A00",
      "Final Exam",
      "12/12/2021",
      "12:00PM",
      "CSB",
      "130",
    );
    section.addExam(exam);
    expect(section.exams).toEqual([exam]);
  });
});

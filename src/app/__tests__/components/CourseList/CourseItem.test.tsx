import { render, screen } from "@testing-library/react";

import CourseItem from "@/app/components/CourseList/CourseItem";
import Course from "@/lib/model/courses/course";

import Section from "@/lib/model/sections/section";

import Lecture from "@/lib/model/activities/activity-types/lecture";
import Discussion from "@/lib/model/activities/activity-types/discussion";
import Lab from "@/lib/model/activities/activity-types/lab";
import Studio from "@/lib/model/activities/activity-types/studio";

import Midterm from "@/lib/model/exams/exam-types/midterm";
import Final from "@/lib/model/exams/exam-types/final";

describe("Test CourseItem", () => {
  test("Test Default Render", () => {
    render(<CourseItem course={new Course("CSE", "110")} />);

    expect(screen.getByText("CSE 110")).toBeInTheDocument();
    expect(screen.getByText("Section")).toBeInTheDocument();
    expect(screen.getByText("Type")).toBeInTheDocument();
    expect(screen.getByText("Days of Week")).toBeInTheDocument();
    expect(screen.getByText("Location")).toBeInTheDocument();
  });

  test("Test Activity Render", () => {
    const course: Course = new Course("CSE", "110");
    const section: Section = new Section("A00");

    section.addActivity(
      new Lecture("A00", "MWF", "10:00a-10:50a", "GH", "242"),
    );
    section.addActivity(
      new Discussion("A01", "M", "11:00a-11:50a", "CENTR", "222"),
    );
    section.addActivity(new Lab("A02", "T", "12:00p-12:50p", "WLH", "200"));
    section.addActivity(new Studio("A03", "W", "1:00p-1:50p", "PETER", "102"));

    course.addSection(section);

    render(<CourseItem course={course} />);

    expect(screen.getByText("A00")).toBeInTheDocument();
    expect(screen.getByText("LE")).toBeInTheDocument();
    expect(screen.getByText("MWF")).toBeInTheDocument();
    expect(screen.getByText("10:00a-10:50a")).toBeInTheDocument();
    expect(screen.getByText("GH 242")).toBeInTheDocument();

    expect(screen.getByText("A01")).toBeInTheDocument();
    expect(screen.getByText("DI")).toBeInTheDocument();
    expect(screen.getByText("M")).toBeInTheDocument();
    expect(screen.getByText("11:00a-11:50a")).toBeInTheDocument();
    expect(screen.getByText("CENTR 222")).toBeInTheDocument();

    expect(screen.getByText("A02")).toBeInTheDocument();
    expect(screen.getByText("LA")).toBeInTheDocument();
    expect(screen.getByText("T")).toBeInTheDocument();
    expect(screen.getByText("12:00p-12:50p")).toBeInTheDocument();
    expect(screen.getByText("WLH 200")).toBeInTheDocument();

    expect(screen.getByText("A03")).toBeInTheDocument();
    expect(screen.getByText("ST")).toBeInTheDocument();
    expect(screen.getByText("W")).toBeInTheDocument();
    expect(screen.getByText("1:00p-1:50p")).toBeInTheDocument();
    expect(screen.getByText("PETER 102")).toBeInTheDocument();
  });

  test("Test Exams Render", () => {
    const course: Course = new Course("CSE", "110");
    const section: Section = new Section("A00");

    section.addExam(
      new Midterm("12/09/2021", "W", "12:00AM-3:00AM", "WLH", "2001"),
    );
    section.addExam(
      new Final("12/15/2021", "Th", "4:00AM-6:00AM", "GH", "242"),
    );

    course.addSection(section);

    render(<CourseItem course={course} />);

    expect(screen.getByText("Exam")).toBeInTheDocument();

    expect(screen.getByText("Type")).toBeInTheDocument();
    expect(screen.getByText("Day of Week")).toBeInTheDocument();
    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("Time")).toBeInTheDocument();
    expect(screen.getByText("Location")).toBeInTheDocument();

    expect(screen.getByText("MI")).toBeInTheDocument();
    expect(screen.getByText("W")).toBeInTheDocument();
    expect(screen.getByText("12/09/2021")).toBeInTheDocument();
    expect(screen.getByText("12:00AM-3:00AM")).toBeInTheDocument();
    expect(screen.getByText("WLH 2001")).toBeInTheDocument();

    expect(screen.getByText("FI")).toBeInTheDocument();
    expect(screen.getByText("Th")).toBeInTheDocument();
    expect(screen.getByText("12/15/2021")).toBeInTheDocument();
    expect(screen.getByText("4:00AM-6:00AM")).toBeInTheDocument();
    expect(screen.getByText("GH 242")).toBeInTheDocument();
  });
});

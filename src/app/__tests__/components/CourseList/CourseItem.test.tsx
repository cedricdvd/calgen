import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import CourseItem from "@/app/components/CourseList/CourseItem";
import Course from "@/lib/model/course";
import CourseSection from "@/lib/model/course-section";
import CourseSectionBuilder from "@/lib/model/course-section-builder";
import SectionInfo from "@/lib/model/section-info";
import ExamInfo from "@/lib/model/exam-info";

describe("Test CourseList", () => {
  // test that it renders only the correct sections of the course
  // test that it renders the course title only once
  let lecture: SectionInfo;
  let discussions: Map<string, SectionInfo>;
  let labs: Map<string, SectionInfo>;
  let studio: Map<string, SectionInfo>;
  let midterms: ExamInfo[];
  let final: ExamInfo;

  beforeEach(() => {
    lecture = new SectionInfo("A00", "MWF", "8:00-8:50a", "CENTR", "115");
    discussions = new Map<string, SectionInfo>();
    discussions.set(
      "A01",
      new SectionInfo("A01", "M", "9:00-9:50a", "EBUB3", "2001"),
    );

    labs = new Map<string, SectionInfo>();
    labs.set(
      "A21",
      new SectionInfo("A21", "W", "10:00-10:50a", "PCYNH", "110"),
    );

    studio = new Map<string, SectionInfo>();
    studio.set(
      "A51",
      new SectionInfo("A51", "F", "11:00-11:50a", "WLH", "2005"),
    );

    midterms = [new ExamInfo("11/14/2021", "W", "8:00-10:00a", "YORK", "4080")];
    final = new ExamInfo("12/15/2021", "W", "7:00-10:00p", "TBA", "TBA");
  });

  test("Renders course list with lecture, discussion, final", () => {
    const section: CourseSection = new CourseSectionBuilder()
      .withSection("A00")
      .withLecture(lecture)
      .withDiscussions(discussions)
      .withFinal(final)
      .build();

    const course: Course = new Course(
      "CSE",
      "110",
      new Map([["A00", section]]),
    );

    render(<CourseItem course={course} />);

    expect(screen.getByText("CSE 110")).toBeInTheDocument();
    expect(screen.getByText("LE")).toBeInTheDocument();
    expect(screen.getByText("A00")).toBeInTheDocument();
    expect(screen.getByText("MWF")).toBeInTheDocument();
    expect(screen.getByText("8:00-8:50a")).toBeInTheDocument();
    expect(screen.getByText("CENTR")).toBeInTheDocument();
    expect(screen.getByText("115")).toBeInTheDocument();
    expect(screen.getByText("DI")).toBeInTheDocument();
    expect(screen.getByText("A01")).toBeInTheDocument();
    expect(screen.getByText("M")).toBeInTheDocument();
    expect(screen.getByText("9:00-9:50a")).toBeInTheDocument();
    expect(screen.getByText("EBUB3")).toBeInTheDocument();
    expect(screen.getByText("2001")).toBeInTheDocument();
    expect(screen.getByText("Final")).toBeInTheDocument();
    expect(screen.getByText("12/15/2021")).toBeInTheDocument();
    expect(screen.getByText("W")).toBeInTheDocument();
    expect(screen.getByText("7:00-10:00p")).toBeInTheDocument();
    expect(screen.getByText("TBA")).toBeInTheDocument();
    expect(screen.getByText("TBA")).toBeInTheDocument();
  });

  test("Renders course list with lecture, lab, studio, final", () => {
    const section: CourseSection = new CourseSectionBuilder()
      .withSection("A00")
      .withLecture(lecture)
      .withLabs(labs)
      .withStudio(studio)
      .withFinal(final)
      .build();

    const course: Course = new Course(
      "CSE",
      "110",
      new Map([["A00", section]]),
    );

    render(<CourseItem course={course} />);

    expect(screen.getByText("CSE 110")).toBeInTheDocument();
    expect(screen.getByText("LE")).toBeInTheDocument();
    expect(screen.getByText("A00")).toBeInTheDocument();
    expect(screen.getByText("MWF")).toBeInTheDocument();
    expect(screen.getByText("8:00-8:50a")).toBeInTheDocument();
    expect(screen.getByText("CENTR")).toBeInTheDocument();
    expect(screen.getByText("115")).toBeInTheDocument();
    expect(screen.getByText("LA")).toBeInTheDocument();
    expect(screen.getByText("A21")).toBeInTheDocument();
    expect(screen.getByText("W")).toBeInTheDocument();
    expect(screen.getByText("10:00-10:50a")).toBeInTheDocument();
    expect(screen.getByText("PCYNH")).toBeInTheDocument();
    expect(screen.getByText("110")).toBeInTheDocument();
    expect(screen.getByText("ST")).toBeInTheDocument();
    expect(screen.getByText("A51")).toBeInTheDocument();
    expect(screen.getByText("F")).toBeInTheDocument();
    expect(screen.getByText("11:00-11:50a")).toBeInTheDocument();
    expect(screen.getByText("WLH")).toBeInTheDocument();
    expect(screen.getByText("2005")).toBeInTheDocument();
    expect(screen.getByText("Final")).toBeInTheDocument();
    expect(screen.getByText("12/15/2021")).toBeInTheDocument();
    expect(screen.getByText("W")).toBeInTheDocument();
    expect(screen.getByText("7:00-10:00p")).toBeInTheDocument();
    expect(screen.getByText("TBA")).toBeInTheDocument();
    expect(screen.getByText("TBA")).toBeInTheDocument();
  });

  test("Renders course with lecture, midterm, final", () => {
    const section: CourseSection = new CourseSectionBuilder()
      .withSection("A00")
      .withLecture(lecture)
      .withMidterms(midterms)
      .withFinal(final)
      .build();

    const course: Course = new Course(
      "CSE",
      "110",
      new Map([["A00", section]]),
    );

    render(<CourseItem course={course} />);

    expect(screen.getByText("CSE 110")).toBeInTheDocument();
    expect(screen.getByText("LE")).toBeInTheDocument();
    expect(screen.getByText("A00")).toBeInTheDocument();
    expect(screen.getByText("MWF")).toBeInTheDocument();
    expect(screen.getByText("8:00-8:50a")).toBeInTheDocument();
    expect(screen.getByText("CENTR")).toBeInTheDocument();
    expect(screen.getByText("115")).toBeInTheDocument();
    expect(screen.getByText("Midterm")).toBeInTheDocument();
    expect(screen.getByText("11/14/2021")).toBeInTheDocument();
    expect(screen.getByText("W")).toBeInTheDocument();
    expect(screen.getByText("8:00-10:00a")).toBeInTheDocument();
    expect(screen.getByText("YORK")).toBeInTheDocument();
    expect(screen.getByText("4080")).toBeInTheDocument();
    expect(screen.getByText("Final")).toBeInTheDocument();
    expect(screen.getByText("12/15/2021")).toBeInTheDocument();
    expect(screen.getByText("W")).toBeInTheDocument();
    expect(screen.getByText("7:00-10:00p")).toBeInTheDocument();
    expect(screen.getByText("TBA")).toBeInTheDocument();
    expect(screen.getByText("TBA")).toBeInTheDocument();
  });

  test("Renders course with lab, midterm", () => {
    const section: CourseSection = new CourseSectionBuilder()
      .withSection("A00")
      .withLabs(labs)
      .withMidterms(midterms)
      .build();

    const course: Course = new Course(
      "CSE",
      "110",
      new Map([["A00", section]]),
    );

    render(<CourseItem course={course} />);

    expect(screen.getByText("CSE 110")).toBeInTheDocument();
    expect(screen.getByText("LA")).toBeInTheDocument();
    expect(screen.getByText("A21")).toBeInTheDocument();
    expect(screen.getByText("W")).toBeInTheDocument();
    expect(screen.getByText("10:00-10:50a")).toBeInTheDocument();
    expect(screen.getByText("PCYNH")).toBeInTheDocument();
    expect(screen.getByText("110")).toBeInTheDocument();
    expect(screen.getByText("Midterm")).toBeInTheDocument();
    expect(screen.getByText("11/14/2021")).toBeInTheDocument();
    expect(screen.getByText("W")).toBeInTheDocument();
    expect(screen.getByText("8:00-10:00a")).toBeInTheDocument();
    expect(screen.getByText("YORK")).toBeInTheDocument();
    expect(screen.getByText("4080")).toBeInTheDocument();
  });

  test("Renders course title only once", () => {
    const section: CourseSection = new CourseSectionBuilder()
      .withSection("A00")
      .withLecture(lecture)
      .withDiscussions(discussions)
      .withFinal(final)
      .build();

    const course: Course = new Course(
      "CSE",
      "110",
      new Map([["A00", section]]),
    );

    render(<CourseItem course={course} />);

    expect(screen.getByText("CSE 110")).toBeInTheDocument();
    expect(screen.queryAllByText("CSE 110").length).toBe(1);
  });
});

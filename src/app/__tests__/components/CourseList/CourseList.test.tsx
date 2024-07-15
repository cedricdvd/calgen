import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import CourseList from "@/app/components/CourseList/CourseList";
import Course from "@/lib/model/course";
import CourseSection from "@/lib/model/course-section";
import CourseSectionBuilder from "@/lib/model/course-section-builder";
import SectionInfo from "@/lib/model/section-info";
import ExamInfo from "@/lib/model/exam-info";

describe("Test CourseList", () => {
  test("Renders multiple courses", () => {
    let courses: Course[];
    let section: CourseSection;
    let lecture: SectionInfo;
    let discussions: Map<string, SectionInfo>;
    let labs: Map<string, SectionInfo>;
    let studio: Map<string, SectionInfo>;
    let midterms: ExamInfo[];
    let final: ExamInfo;

    courses = [];

    lecture = new SectionInfo("A00", "MWF", "10:00-10:50a", "CENTR", "115");
    discussions = new Map<string, SectionInfo>();
    discussions.set(
      "A01",
      new SectionInfo("A01", "Tu", "8:00-8:50a", "HSS", "1330"),
    );
    midterms = [new ExamInfo("12/15/2021", "W", "8:00-10:00a", "PCYNH", "106")];
    final = new ExamInfo("12/20/2021", "M", "8:00-10:00a", "WLH", "2001");

    section = new CourseSectionBuilder()
      .withSection("A00")
      .withLecture(lecture)
      .withDiscussions(discussions)
      .withMidterms(midterms)
      .withFinal(final)
      .build();

    courses.push(new Course("CSE", "105", new Map([["A00", section]])));

    lecture = new SectionInfo("B00", "TuTh", "9:30-10:50a", "MANDE", "251");
    labs = new Map<string, SectionInfo>();
    labs.set("B01", new SectionInfo("B01", "W", "8:00-9:50a", "HSS", "1345"));
    studio = new Map<string, SectionInfo>();
    studio.set(
      "B02",
      new SectionInfo("B02", "F", "8:00-9:50a", "MCGIL", "231"),
    );

    section = new CourseSectionBuilder()
      .withSection("B00")
      .withLecture(lecture)
      .withLabs(labs)
      .withStudio(studio)
      .build();

    courses.push(new Course("CSE", "110", new Map([["B00", section]])));

    render(<CourseList courses={courses} />);

    // Test if courses are rendered
    expect(screen.getByText("CSE 105")).toBeInTheDocument();
    expect(screen.getByText("CSE 110")).toBeInTheDocument();

    // Test if lecture details are rendered for CSE 105
    expect(screen.getByText("A00")).toBeInTheDocument();
    expect(screen.getByText("MWF")).toBeInTheDocument();
    expect(screen.getByText("10:00-10:50a")).toBeInTheDocument();
    expect(screen.getByText("CENTR")).toBeInTheDocument();
    expect(screen.getByText("115")).toBeInTheDocument();

    // Test if discussion details are rendered for CSE 105
    expect(screen.getByText("A01")).toBeInTheDocument();
    expect(screen.getByText("Tu")).toBeInTheDocument();
    expect(screen.getByText("8:00-8:50a")).toBeInTheDocument();
    expect(screen.getByText("HSS")).toBeInTheDocument();
    expect(screen.getByText("1330")).toBeInTheDocument();

    // Test if midterm and final details are rendered for CSE 105
    expect(screen.getByText("12/15/2021")).toBeInTheDocument();
    expect(screen.getByText("W")).toBeInTheDocument();
    expect(screen.getByText("8:00-10:00a")).toBeInTheDocument();
    expect(screen.getByText("PCYNH")).toBeInTheDocument();
    expect(screen.getByText("106")).toBeInTheDocument();

    expect(screen.getByText("12/20/2021")).toBeInTheDocument();
    expect(screen.getByText("M")).toBeInTheDocument();
    expect(screen.getByText("8:00-10:00a")).toBeInTheDocument();
    expect(screen.getByText("WLH")).toBeInTheDocument();
    expect(screen.getByText("2001")).toBeInTheDocument();

    // Test if lecture details are rendered for CSE 110
    expect(screen.getByText("B00")).toBeInTheDocument();
    expect(screen.getByText("TuTh")).toBeInTheDocument();
    expect(screen.getByText("9:30-10:50a")).toBeInTheDocument();
    expect(screen.getByText("MANDE")).toBeInTheDocument();
    expect(screen.getByText("251")).toBeInTheDocument();

    // Test if lab details are rendered for CSE 110
    expect(screen.getByText("B01")).toBeInTheDocument();
    expect(screen.getByText("W")).toBeInTheDocument();
    expect(screen.getByText("8:00-9:50a")).toBeInTheDocument();
    expect(screen.getByText("HSS")).toBeInTheDocument();
    expect(screen.getByText("1345")).toBeInTheDocument();

    // Test if studio details are rendered for CSE 110
    expect(screen.getByText("B02")).toBeInTheDocument();
    expect(screen.getByText("F")).toBeInTheDocument();
    expect(screen.getByText("8:00-9:50a")).toBeInTheDocument();
    expect(screen.getByText("MCGIL")).toBeInTheDocument();
    expect(screen.getByText("231")).toBeInTheDocument();
  });
});

import Course from "@/lib/model/course";
import CourseSection from "@/lib/model/course-section";
import CourseSectionBuilder from "@/lib/model/course-section-builder";
import LectureDetails from "@/app/components/CourseForm/LectureDetails";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("LectureDetails", () => {
  let setSectionTitle: jest.Mock;
  let handleSelect: jest.Mock;

  beforeEach(() => {
    setSectionTitle = jest.fn((x) => x);
    handleSelect = jest.fn((setValue, value) => setValue(value));
  });

  it("renders a select element", () => {
    let course = new Course("CSE", "100", new Map());

    render(
      <LectureDetails
        course={course}
        sectionTitle={"1"}
        setSectionTitle={setSectionTitle}
        handleSelect={handleSelect}
      />,
    );

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
  });

  it("renders correct options", () => {
    let course = new Course(
      "CSE",
      "100",
      new Map([
        ["A00", new CourseSectionBuilder().withSection("A00").build()],
        ["B00", new CourseSectionBuilder().withSection("B00").build()],
      ]),
    );

    render(
      <LectureDetails
        course={course}
        sectionTitle={"1"}
        setSectionTitle={setSectionTitle}
        handleSelect={handleSelect}
      />,
    );

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveTextContent("Select a section");
    expect(options[1]).toHaveTextContent("A00");
    expect(options[2]).toHaveTextContent("B00");

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "B00" },
    });

    expect(handleSelect).toHaveBeenCalledWith(setSectionTitle, "B00");
    expect(setSectionTitle).toHaveBeenCalledWith("B00");
    expect(setSectionTitle).toHaveReturnedWith("B00");
  });
});

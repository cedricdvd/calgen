import { render, screen } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";

import Course from "@/lib/model/course";
import CourseSectionBuilder from "@/lib/model/course-section-builder";
import LectureDetails from "@/app/components/CourseForm/LectureDetails";

describe("LectureDetails", () => {
  let setSectionTitle: jest.Mock;
  let handleSelect: jest.Mock;
  let user: UserEvent;

  beforeEach(() => {
    setSectionTitle = jest.fn((x) => x);
    handleSelect = jest.fn((setValue, value) => setValue(value));
    user = userEvent.setup();
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

  it("renders correct options", async () => {
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

    await user.selectOptions(screen.getByRole("combobox"), "B00");

    expect(handleSelect).toHaveBeenCalledWith(setSectionTitle, "B00");
    expect(setSectionTitle).toHaveBeenCalledWith("B00");
    expect(setSectionTitle).toHaveReturnedWith("B00");
  });
});

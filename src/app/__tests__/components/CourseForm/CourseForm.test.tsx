import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import CourseForm from "@/app/components/CourseForm/CourseForm";

describe("CourseForm", () => {
  // Things to test:
  // - Renders
  // - onSubmitCourse allows us to select LectureDetails
  // - onSubmitSectionPart allows us to select SectionParts
  // - onSubmitSelectionPart finalizes a course object

  it("renders", () => {
    render(<CourseForm />);
    const form = screen.getByRole("form");
    expect(form).toBeInTheDocument();
  });
});

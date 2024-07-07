import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import CourseForm from "@/app/components/CourseForm/CourseForm";

describe("CourseForm", () => {
  // TODO:
  // onSubmit branching
  // handleSelect branching
  // resetSelections branching

  it("renders", () => {
    render(<CourseForm />);
    const form = screen.getByRole("form");
    expect(form).toBeInTheDocument();

    const selects = screen.getAllByRole("combobox");
    expect(selects.length).toBe(1);
  });

  it("Once department and course are selected, LectureDetails are shown", () => {
    render(<CourseForm />);
    let selects = screen.getAllByRole("combobox");
    let department = selects[0];
    fireEvent.change(department, { target: { value: "CSE" } });

    selects = screen.getAllByRole("combobox");
    let course = selects[1];

    fireEvent.change(course, { target: { value: "120" } });

    selects = screen.getAllByRole("combobox");
    expect(selects.length).toBe(3);
  });

  it("Once LectureDetails are selected, SectionDetails are shown", () => {
    render(<CourseForm />);
    let selects = screen.getAllByRole("combobox");
    let department = selects[0];
    fireEvent.change(department, { target: { value: "COGS" } });

    selects = screen.getAllByRole("combobox");
    let course = selects[1];

    fireEvent.change(course, { target: { value: "108" } });

    selects = screen.getAllByRole("combobox");
    let lecture = selects[2];
    fireEvent.change(lecture, { target: { value: "A00" } });
    selects = screen.getAllByRole("combobox");
    expect(selects.length).toBe(4);
  });

  it("Once SectionDetails are selected, the course is finalized", () => {
    render(<CourseForm />);
    let selects = screen.getAllByRole("combobox");
    let department = selects[0];
    fireEvent.change(department, { target: { value: "COGS" } });

    selects = screen.getAllByRole("combobox");
    let course = selects[1];
    fireEvent.change(course, { target: { value: "108" } });

    selects = screen.getAllByRole("combobox");
    let lecture = selects[2];
    fireEvent.change(lecture, { target: { value: "A00" } });

    selects = screen.getAllByRole("combobox");
    let section = selects[3];
    fireEvent.change(section, { target: { value: "A01" } });

    const submit = screen.getByRole("button");
    fireEvent.click(submit);
  });
});

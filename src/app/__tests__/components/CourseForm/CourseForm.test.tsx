import { render, screen } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";

import CourseForm from "@/app/components/CourseForm/CourseForm";

describe("CourseForm", () => {
  // TODO:
  // onSubmit branching
  // handleSelect branching
  // resetSelections branching
  const user: UserEvent = userEvent.setup();

  it("renders", () => {
    render(<CourseForm />);
    const form = screen.getByRole("form");
    expect(form).toBeInTheDocument();

    const selects = screen.getAllByRole("combobox");
    expect(selects.length).toBe(1);
  });

  describe("Course selection", () => {
    it("Once department and course are selected, LectureDetails are shown", async () => {
      render(<CourseForm />);
      let selects = screen.getAllByRole("combobox");
      let department = selects[0];
      await user.selectOptions(department, "CSE");

      selects = screen.getAllByRole("combobox");
      let course = selects[1];

      await user.selectOptions(course, "120");

      selects = screen.getAllByRole("combobox");
      expect(selects.length).toBe(3);
    });

    it("Once LectureDetails are selected, SectionDetails are shown", async () => {
      render(<CourseForm />);
      let selects = screen.getAllByRole("combobox");
      let department = selects[0];
      await user.selectOptions(department, "COGS");

      selects = screen.getAllByRole("combobox");
      let course = selects[1];

      await user.selectOptions(course, "108");

      selects = screen.getAllByRole("combobox");
      let lecture = selects[2];
      await user.selectOptions(lecture, "A00");
      selects = screen.getAllByRole("combobox");
      expect(selects.length).toBe(4);
    });

    it("Once SectionDetails are selected, the course is finalized", async () => {
      render(<CourseForm />);
      let selects = screen.getAllByRole("combobox");
      let department = selects[0];
      await user.selectOptions(department, "COGS");

      selects = screen.getAllByRole("combobox");
      let course = selects[1];
      await user.selectOptions(course, "108");

      selects = screen.getAllByRole("combobox");
      let lecture = selects[2];
      await user.selectOptions(lecture, "A00");

      selects = screen.getAllByRole("combobox");
      let section = selects[3];
      await user.selectOptions(section, "A01");

      const submit = screen.getByRole("button");
      await user.click(submit);
    });
  });

  describe("resetSelection Branching", () => {
    beforeEach(async () => {
      render(<CourseForm />);
    });

    it("resetSelections if department", async () => {
      let selects = screen.getAllByRole("combobox");
      let department = selects[0];
      await user.selectOptions(department, "COGS");

      selects = screen.getAllByRole("combobox");
      let course = selects[1];
      await user.selectOptions(course, "108");

      selects = screen.getAllByRole("combobox");
      let lecture = selects[2];
      await user.selectOptions(lecture, "A00");

      selects = screen.getAllByRole("combobox");
      let section = selects[3];
      await user.selectOptions(section, "A01");

      selects = screen.getAllByRole("combobox");
      department = selects[0];

      await user.selectOptions(department, "MATH");
      selects = screen.getAllByRole("combobox");

      expect(selects.length).toBe(2);
      expect(selects[0]).toHaveValue("MATH");
      expect(selects[1]).toHaveValue("");
    });

    it("resetSelections if courseNum changes", async () => {
      let selects = screen.getAllByRole("combobox");
      let department = selects[0];
      await user.selectOptions(department, "CSE");

      selects = screen.getAllByRole("combobox");
      let course = selects[1];
      await user.selectOptions(course, "120");

      selects = screen.getAllByRole("combobox");
      let lecture = selects[2];
      await user.selectOptions(lecture, "A00");

      selects = screen.getAllByRole("combobox");
      let section = selects[3];
      await user.selectOptions(section, "A01");

      course = selects[1];
      await user.selectOptions(course, "170");
      selects = screen.getAllByRole("combobox");

      expect(selects.length).toBe(3);
      expect(selects[0]).toHaveValue("CSE");
      expect(selects[1]).toHaveValue("170");
      expect(selects[2]).toHaveValue("");
    });

    it("resetSelections if section changes", async () => {
      let selects = screen.getAllByRole("combobox");
      let department = selects[0];
      await user.selectOptions(department, "MATH");

      selects = screen.getAllByRole("combobox");
      let course = selects[1];
      await user.selectOptions(course, "20C");

      selects = screen.getAllByRole("combobox");
      let lecture = selects[2];
      await user.selectOptions(lecture, "A00");

      selects = screen.getAllByRole("combobox");
      let section = selects[3];
      await user.selectOptions(section, "A01");

      lecture = selects[2];
      await user.selectOptions(lecture, "B00");
      selects = screen.getAllByRole("combobox");

      expect(selects.length).toBe(4);
      expect(selects[0]).toHaveValue("MATH");
      expect(selects[1]).toHaveValue("20C");
      expect(selects[2]).toHaveValue("B00");
      expect(selects[3]).toHaveValue("");
    });
  });
});

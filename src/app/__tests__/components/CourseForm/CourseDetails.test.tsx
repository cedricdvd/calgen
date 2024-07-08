import { render, screen } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";

import CourseDetails from "@/app/components/CourseForm/CourseDetails";
import SimpleRepo from "@/lib/database/simple-repo";

describe("CourseDetails", () => {
  let repo: SimpleRepo;
  let setDepartment: jest.Mock;
  let setCourseNumber: jest.Mock;
  let handleSelect: jest.Mock;
  let user: UserEvent;

  beforeEach(() => {
    repo = new SimpleRepo();
    repo.fillExampleClasses();
    setDepartment = jest.fn((x) => x);
    setCourseNumber = jest.fn((x) => x);
    handleSelect = jest.fn((setValue, value) => setValue(value));
    user = userEvent.setup();
  });

  it("renders a select", () => {
    render(
      <CourseDetails
        repo={repo}
        department=""
        setDepartment={setDepartment}
        courseNumber=""
        setCourseNumber={setCourseNumber}
        handleSelect={handleSelect}
      />,
    );
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect(select).toHaveLength(4);
    expect(select).toHaveTextContent("Select a department");
  });

  it("renders correct options", () => {
    render(
      <CourseDetails
        repo={repo}
        department=""
        setDepartment={setDepartment}
        courseNumber=""
        setCourseNumber={setCourseNumber}
        handleSelect={handleSelect}
      />,
    );
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(4);
    expect(options[0]).toHaveTextContent("Select a department");
    expect(options[1]).toHaveTextContent("COGS");
    expect(options[2]).toHaveTextContent("MATH");
    expect(options[3]).toHaveTextContent("CSE");
  });

  it("calls setDepartment", async () => {
    render(
      <CourseDetails
        repo={repo}
        department=""
        setDepartment={setDepartment}
        courseNumber=""
        setCourseNumber={setCourseNumber}
        handleSelect={handleSelect}
      />,
    );

    await user.selectOptions(screen.getByRole("combobox"), "CSE");

    expect(handleSelect).toHaveBeenCalledWith(setDepartment, "CSE");
    expect(setDepartment).toHaveBeenCalledWith("CSE");
    expect(setDepartment).toHaveReturnedWith("CSE");
  });

  it("renders a second select", async () => {
    render(
      <CourseDetails
        repo={repo}
        department="CSE"
        setDepartment={setDepartment}
        courseNumber=""
        setCourseNumber={setCourseNumber}
        handleSelect={handleSelect}
      />,
    );

    const selects = screen.getAllByRole("combobox");
    expect(selects).toHaveLength(2);

    const departmentSelect = selects[0];
    await user.selectOptions(departmentSelect, "CSE");

    const courseSelect = selects[1];
    expect(courseSelect).toBeInTheDocument();
    expect(courseSelect).toHaveLength(3);
    expect(courseSelect).toHaveTextContent("Select a course number");

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(7);
    expect(options[0]).toHaveTextContent("Select a department");
    expect(options[1]).toHaveTextContent("COGS");
    expect(options[2]).toHaveTextContent("MATH");
    expect(options[3]).toHaveTextContent("CSE");
    expect(options[4]).toHaveTextContent("Select a course number");
    expect(options[5]).toHaveTextContent("120");
    expect(options[6]).toHaveTextContent("170");

    await user.selectOptions(courseSelect, "120");

    expect(handleSelect).toHaveBeenCalledWith(setCourseNumber, "120");
    expect(setCourseNumber).toHaveBeenCalledWith("120");
    expect(setCourseNumber).toHaveReturnedWith("120");
  });
});

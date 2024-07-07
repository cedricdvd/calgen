import CourseDetails from "@/app/components/CourseForm/CourseDetails";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import SimpleRepo from "@/lib/database/simple-repo";

describe("CourseDetails", () => {
  let repo: SimpleRepo;
  let setDepartment: jest.Mock;
  let setCourseNumber: jest.Mock;

  beforeEach(() => {
    repo = new SimpleRepo();
    repo.fillExampleClasses();
    setDepartment = jest.fn();
    setCourseNumber = jest.fn();
  });

  it("renders a select", () => {
    render(
      <CourseDetails
        repo={repo}
        department=""
        setDepartment={setDepartment}
        courseNumber=""
        setCourseNumber={setCourseNumber}
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
      />,
    );
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(4);
    expect(options[0]).toHaveTextContent("Select a department");
    expect(options[1]).toHaveTextContent("COGS");
    expect(options[2]).toHaveTextContent("MATH");
    expect(options[3]).toHaveTextContent("CSE");
  });

  it("calls setDepartment", () => {
    render(
      <CourseDetails
        repo={repo}
        department=""
        setDepartment={setDepartment}
        courseNumber=""
        setCourseNumber={setCourseNumber}
      />,
    );
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "CSE" },
    });

    expect(setDepartment).toHaveBeenCalledWith("CSE");
  });

  it("renders a second select", () => {
    render(
      <CourseDetails
        repo={repo}
        department="CSE"
        setDepartment={setDepartment}
        courseNumber=""
        setCourseNumber={setCourseNumber}
      />,
    );

    const selects = screen.getAllByRole("combobox");
    expect(selects).toHaveLength(2);

    fireEvent.change(screen.getAllByRole("combobox")[0], {
      target: { value: "CSE" },
    });

    const select = screen.getAllByRole("combobox")[1];
    expect(select).toBeInTheDocument();
    expect(select).toHaveLength(3);
    expect(select).toHaveTextContent("Select a course number");

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(7);
    expect(options[0]).toHaveTextContent("Select a department");
    expect(options[1]).toHaveTextContent("COGS");
    expect(options[2]).toHaveTextContent("MATH");
    expect(options[3]).toHaveTextContent("CSE");
    expect(options[4]).toHaveTextContent("Select a course number");
    expect(options[5]).toHaveTextContent("120");
    expect(options[6]).toHaveTextContent("170");

    fireEvent.change(screen.getAllByRole("combobox")[1], {
      target: { value: "120" },
    });

    expect(setCourseNumber).toHaveBeenCalledWith("120");
  });
});

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import ExamDetails from "@/app/components/CourseForm/ExamDetails";
import Midterm from "@/lib/model/exams/exam-types/midterm";
import Final from "@/lib/model/exams/exam-types/final";

describe("Test ExamDetails", () => {
  test("Test Default Render", () => {
    render(<ExamDetails exams={[]} />);

    expect(screen.getByText("Exams")).toBeInTheDocument();
    expect(screen.getByText("No exams")).toBeInTheDocument();
  });

  test("Test Render", () => {
    render(
      <ExamDetails
        exams={[
          new Midterm("10/17/2021", "M", "12:00am-1:00am", "EBUB3", "100"),
          new Midterm("11/17/2021", "Tu", "2:00am-3:00am", "PCYNH", "200"),
          new Final("12/17/2021", "F", "3:00am-4:00am", "WLH", "2001"),
        ]}
      />,
    );

    expect(screen.getAllByText("MI")).toHaveLength(2);
    expect(screen.getAllByText("FI")).toHaveLength(1);

    expect(screen.getByText("10/17/2021")).toBeInTheDocument();
    expect(screen.getByText("11/17/2021")).toBeInTheDocument();
    expect(screen.getByText("12/17/2021")).toBeInTheDocument();

    expect(screen.getByText("12:00am-1:00am")).toBeInTheDocument();
    expect(screen.getByText("2:00am-3:00am")).toBeInTheDocument();
    expect(screen.getByText("3:00am-4:00am")).toBeInTheDocument();

    expect(screen.queryByText("M")).not.toBeInTheDocument();
    expect(screen.queryByText("Tu")).not.toBeInTheDocument();
    expect(screen.queryByText("F")).not.toBeInTheDocument();

    expect(screen.queryByText("EBUB3")).not.toBeInTheDocument();
    expect(screen.queryByText("100")).not.toBeInTheDocument();
    expect(screen.queryByText("PCYNH")).not.toBeInTheDocument();
    expect(screen.queryByText("200")).not.toBeInTheDocument();
    expect(screen.queryByText("WLH")).not.toBeInTheDocument();
    expect(screen.queryByText("2001")).not.toBeInTheDocument();
  });

  test("Test Render No Midterms", () => {
    render(
      <ExamDetails
        exams={[new Final("12/17/2021", "F", "3:00am-4:00am", "WLH", "2001")]}
      />,
    );

    expect(screen.getAllByText("FI")).toHaveLength(1);

    expect(screen.getByText("12/17/2021")).toBeInTheDocument();
    expect(screen.getByText("3:00am-4:00am")).toBeInTheDocument();

    expect(screen.queryByText("F")).not.toBeInTheDocument();

    expect(screen.queryByText("WLH")).not.toBeInTheDocument();
    expect(screen.queryByText("2001")).not.toBeInTheDocument();

    expect(screen.queryByText("MI")).not.toBeInTheDocument();
  });

  test("Test Render No Finals", () => {
    render(
      <ExamDetails
        exams={[
          new Midterm("10/17/2021", "M", "12:00am-1:00am", "EBUB3", "100"),
          new Midterm("11/17/2021", "Tu", "2:00am-3:00am", "PCYNH", "200"),
        ]}
      />,
    );

    expect(screen.getAllByText("MI")).toHaveLength(2);

    expect(screen.getByText("10/17/2021")).toBeInTheDocument();
    expect(screen.getByText("11/17/2021")).toBeInTheDocument();

    expect(screen.getByText("12:00am-1:00am")).toBeInTheDocument();
    expect(screen.getByText("2:00am-3:00am")).toBeInTheDocument();

    expect(screen.queryByText("M")).not.toBeInTheDocument();
    expect(screen.queryByText("Tu")).not.toBeInTheDocument();

    expect(screen.queryByText("EBUB3")).not.toBeInTheDocument();
    expect(screen.queryByText("100")).not.toBeInTheDocument();
    expect(screen.queryByText("PCYNH")).not.toBeInTheDocument();
    expect(screen.queryByText("200")).not.toBeInTheDocument();

    expect(screen.queryByText("FI")).not.toBeInTheDocument();
  });
});

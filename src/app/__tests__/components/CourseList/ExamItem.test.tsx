import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import ExamItem from "@/app/components/CourseList/ExamItem";
import Midterm from "@/lib/model/exams/exam-types/midterm";

describe("Test ExamItem", () => {
  test("Test Render", () => {
    render(
      <ExamItem
        exam={new Midterm("12/09/2021", "W", "12:00AM-3:00AM", "WLH", "2001")}
      />,
    );

    expect(screen.getByText("MI")).toBeInTheDocument();
    expect(screen.getByText("12/09/2021")).toBeInTheDocument();
    expect(screen.getByText("W")).toBeInTheDocument();
    expect(screen.getByText("12:00AM-3:00AM")).toBeInTheDocument();
    expect(screen.getByText("WLH 2001")).toBeInTheDocument();
  });
});

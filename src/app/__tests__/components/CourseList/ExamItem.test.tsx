import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import ExamItem from "@/app/components/CourseList/ExamItem";
import ExamInfo from "@/lib/model/exam-info";

describe("ExamItem", () => {
  it("renders an exam item", () => {
    const exam = new ExamInfo("12/15/2021", "W", "8:00-10:00a", "CENTR", "115");

    const examType = "FI";
    render(<ExamItem examType={examType} exam={exam} />);

    const textItems = ["FI", "12/15/2021", "W", "8:00-10:00a", "CENTR", "115"];

    for (const textItem of textItems) {
      expect(screen.getByText(textItem)).toBeInTheDocument();
    }
  });
});

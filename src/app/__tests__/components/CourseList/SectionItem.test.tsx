import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import SectionItem from "@/app/components/CourseList/SectionItem";
import SectionInfo from "@/lib/model/section-info";

describe("SectionItem", () => {
  it("renders a section item", () => {
    const section = new SectionInfo(
      "A01",
      "MWF",
      "10:00-10:50p",
      "CENTR",
      "115",
    );

    const courseName = "CSE 105";
    const sectionType = "DI";
    render(
      <SectionItem
        courseName={courseName}
        sectionType={sectionType}
        section={section}
      />,
    );

    expect(screen.getByText("CSE 105")).toBeInTheDocument();
    expect(screen.getByText("DI")).toBeInTheDocument();
    expect(screen.getByText("A01")).toBeInTheDocument();
    expect(screen.getByText("MWF")).toBeInTheDocument();
    expect(screen.getByText("10:00-10:50p")).toBeInTheDocument();
    expect(screen.getByText("CENTR")).toBeInTheDocument();
    expect(screen.getByText("115")).toBeInTheDocument();
  });
});

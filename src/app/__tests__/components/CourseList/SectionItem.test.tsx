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

    const sectionType = "DI";
    render(<SectionItem sectionType={sectionType} section={section} />);

    const textItems = ["DI", "A01", "MWF", "10:00-10:50p", "CENTR", "115"];

    for (const textItem of textItems) {
      expect(screen.getByText(textItem)).toBeInTheDocument();
    }
  });
});

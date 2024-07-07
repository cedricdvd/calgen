import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import SimpleRepo from "@/lib/database/simple-repo";
import CourseSection from "@/lib/model/course-section";
import SectionDetails from "@/app/components/CourseForm/SectionDetails";
import CourseSectionBuilder from "@/lib/model/course-section-builder";
import SectionInfo from "@/lib/model/section-info";

describe("SectionDetails", () => {
  let section: CourseSection;
  let setDiscussionSection: jest.Mock;
  let setLabSection: jest.Mock;
  let setStudioSection: jest.Mock;

  beforeEach(() => {
    section = new CourseSectionBuilder().withSection("A00").build();
    setDiscussionSection = jest.fn();
    setLabSection = jest.fn();
    setStudioSection = jest.fn();
  });

  it("renders a select element", () => {
    render(
      <SectionDetails
        section={section}
        discussionSection={"A00"}
        setDiscussionSection={setDiscussionSection}
        labSection={"A00"}
        setLabSection={setLabSection}
        studioSection={"A00"}
        setStudioSection={setStudioSection}
      />,
    );

    const select = screen.queryByRole("combobox");
    expect(select).toBeNull();
  });

  it("renders correct discussion", () => {
    section = new CourseSectionBuilder()
      .withDiscussions(
        new Map([
          ["A01", new SectionInfo("", "", "", "", "")],
          ["A02", new SectionInfo("", "", "", "", "")],
        ]),
      )
      .build();

    render(
      <SectionDetails
        section={section}
        discussionSection={""}
        setDiscussionSection={setDiscussionSection}
        labSection={""}
        setLabSection={setLabSection}
        studioSection={""}
        setStudioSection={setStudioSection}
      />,
    );

    const select = screen.getByRole("combobox");
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(3);

    fireEvent.change(select, {
      target: { value: "A01" },
    });

    expect(setDiscussionSection).toHaveBeenCalledWith("A01");
  });

  it("renders correct lab", () => {
    section = new CourseSectionBuilder()
      .withLabs(
        new Map([
          ["A01", new SectionInfo("", "", "", "", "")],
          ["A02", new SectionInfo("", "", "", "", "")],
        ]),
      )
      .build();

    render(
      <SectionDetails
        section={section}
        discussionSection={""}
        setDiscussionSection={setDiscussionSection}
        labSection={""}
        setLabSection={setLabSection}
        studioSection={""}
        setStudioSection={setStudioSection}
      />,
    );

    const select = screen.getByRole("combobox");
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(3);

    fireEvent.change(select, {
      target: { value: "A01" },
    });

    expect(setLabSection).toHaveBeenCalledWith("A01");
  });

  it("renders correct studio", () => {
    section = new CourseSectionBuilder()
      .withStudio(
        new Map([
          ["A01", new SectionInfo("", "", "", "", "")],
          ["A02", new SectionInfo("", "", "", "", "")],
        ]),
      )
      .build();

    render(
      <SectionDetails
        section={section}
        discussionSection={""}
        setDiscussionSection={setDiscussionSection}
        labSection={""}
        setLabSection={setLabSection}
        studioSection={""}
        setStudioSection={setStudioSection}
      />,
    );

    const select = screen.getByRole("combobox");
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(3);

    fireEvent.change(select, {
      target: { value: "A01" },
    });

    expect(setStudioSection).toHaveBeenCalledWith("A01");
  });
});

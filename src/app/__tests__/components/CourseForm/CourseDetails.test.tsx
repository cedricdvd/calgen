import { render, screen, cleanup } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";

import CourseDetails from "@/app/components/CourseForm/CourseDetails";
import SimpleRepo from "@/lib/database/simple-repo";

describe("Test CourseDetails", () => {
  let courseRepository: SimpleRepo;
  let department: string;
  let courseNum: string;
  let sectionNum: string;

  function setDepartment(value: string) {
    department = value;
  }

  function setCourseNum(value: string) {
    courseNum = value;
  }

  function setSectionNum(value: string) {
    sectionNum = value;
  }

  function handleSelect(setSelected: (value: string) => void, value: string) {
    setSelected(value);
  }

  beforeEach(() => {
    courseRepository = new SimpleRepo();
    department = "";
    courseNum = "";
    sectionNum = "";
  });

  test("Tests default render", () => {
    render(
      <CourseDetails
        courseRepository={courseRepository}
        department={department}
        courseNum={courseNum}
        sectionNum={sectionNum}
        setDepartment={setDepartment}
        setCourseNum={setCourseNum}
        setSectionNum={setSectionNum}
        handleSelect={handleSelect}
      />,
    );

    expect(screen.getByText("Course")).toBeInTheDocument();
    expect(screen.getByText("No courses available")).toBeInTheDocument();
  });

  describe("Test user interaction when courses available", () => {
    const user: UserEvent = userEvent.setup();

    beforeEach(() => {
      courseRepository.fillExampleCourses();
    });

    test("Test multiple department options", () => {
      const { rerender } = render(
        <CourseDetails
          courseRepository={courseRepository}
          department={department}
          courseNum={courseNum}
          sectionNum={sectionNum}
          setDepartment={setDepartment}
          setCourseNum={setCourseNum}
          setSectionNum={setSectionNum}
          handleSelect={handleSelect}
        />,
      );

      const departmentSelect = screen.getByRole("combobox", {
        name: "Department",
      });

      expect(
        screen.getByRole("option", { name: "Select a department" }),
      ).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "COGS" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "CSE" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "MATH" })).toBeInTheDocument();
    });

    test("Test multiple course number options", async () => {
      const { rerender } = render(
        <CourseDetails
          courseRepository={courseRepository}
          department={department}
          courseNum={courseNum}
          sectionNum={sectionNum}
          setDepartment={setDepartment}
          setCourseNum={setCourseNum}
          setSectionNum={setSectionNum}
          handleSelect={handleSelect}
        />,
      );

      const departmentSelect = screen.getByRole("combobox", {
        name: "Department",
      });

      await user.selectOptions(departmentSelect, "CSE");

      rerender(
        <CourseDetails
          courseRepository={courseRepository}
          department={department}
          courseNum={courseNum}
          sectionNum={sectionNum}
          setDepartment={setDepartment}
          setCourseNum={setCourseNum}
          setSectionNum={setSectionNum}
          handleSelect={handleSelect}
        />,
      );

      expect(
        screen.getByRole("combobox", { name: "CourseNum" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("option", { name: "Select a course number" }),
      ).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "120" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "170" })).toBeInTheDocument();
    });

    test("Test multiple section number options", async () => {
      const { rerender } = render(
        <CourseDetails
          courseRepository={courseRepository}
          department={department}
          courseNum={courseNum}
          sectionNum={sectionNum}
          setDepartment={setDepartment}
          setCourseNum={setCourseNum}
          setSectionNum={setSectionNum}
          handleSelect={handleSelect}
        />,
      );

      const departmentSelect = screen.getByRole("combobox", {
        name: "Department",
      });

      await user.selectOptions(departmentSelect, "MATH");
      rerender(
        <CourseDetails
          courseRepository={courseRepository}
          department={department}
          courseNum={courseNum}
          sectionNum={sectionNum}
          setDepartment={setDepartment}
          setCourseNum={setCourseNum}
          setSectionNum={setSectionNum}
          handleSelect={handleSelect}
        />,
      );

      const courseNumSelect = screen.getByRole("combobox", {
        name: "CourseNum",
      });
      await user.selectOptions(courseNumSelect, "20C");
      rerender(
        <CourseDetails
          courseRepository={courseRepository}
          department={department}
          courseNum={courseNum}
          sectionNum={sectionNum}
          setDepartment={setDepartment}
          setCourseNum={setCourseNum}
          setSectionNum={setSectionNum}
          handleSelect={handleSelect}
        />,
      );

      expect(
        screen.getByRole("combobox", { name: "SectionNum" }),
      ).toBeInTheDocument();

      expect(
        screen.getByRole("option", { name: "Select a section number" }),
      ).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "A00" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "B00" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "C00" })).toBeInTheDocument();
    });
  });
});

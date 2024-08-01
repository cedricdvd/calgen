import { render, screen } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";

import CourseForm from "@/app/components/CourseForm/CourseForm";
import ICourse from "@/lib/model/courses/course-interface";
import SimpleRepo from "@/lib/database/simple-repo";
import CourseDetails from "@/app/components/CourseForm/CourseDetails";

describe("Test CourseForm", () => {
  let courseRepository: SimpleRepo;
  let courseList: ICourse[];
  let setCourseList: (value: ICourse[]) => void;

  beforeEach(() => {
    courseRepository = new SimpleRepo();
    courseList = [];
    setCourseList = (value: ICourse[]) => {
      courseList = value;
    };
  });

  test("Test Default Render", () => {
    render(
      <CourseForm
        courseRepository={courseRepository}
        courseList={courseList}
        setCourseList={setCourseList}
      />,
    );

    expect(screen.getByText("Course")).toBeInTheDocument();
    expect(screen.getByText("No courses available")).toBeInTheDocument();
  });

  describe("Test User Interaction", () => {
    const user: UserEvent = userEvent.setup();

    beforeEach(() => {
      courseRepository.fillExampleCourses();
    });

    test("Test End to End Selection", async () => {
      const { rerender } = render(
        <CourseForm
          courseRepository={courseRepository}
          courseList={courseList}
          setCourseList={setCourseList}
        />,
      );

      const departmentSelect = screen.getByRole("combobox", {
        name: "Department",
      });

      await user.selectOptions(departmentSelect, "MATH");
      rerender(
        <CourseForm
          courseRepository={courseRepository}
          courseList={courseList}
          setCourseList={setCourseList}
        />,
      );

      const courseNumSelect = screen.getByRole("combobox", {
        name: "CourseNum",
      });
      await user.selectOptions(courseNumSelect, "20C");
      rerender(
        <CourseForm
          courseRepository={courseRepository}
          courseList={courseList}
          setCourseList={setCourseList}
        />,
      );

      const sectionNumSelect = screen.getByRole("combobox", {
        name: "SectionNum",
      });
      await user.selectOptions(sectionNumSelect, "A00");
      rerender(
        <CourseForm
          courseRepository={courseRepository}
          courseList={courseList}
          setCourseList={setCourseList}
        />,
      );

      expect(screen.getAllByText("MI")).toHaveLength(2);
      expect(screen.getAllByText("FI")).toHaveLength(1);
      expect(screen.getAllByText("9:00p-9:50p")).toHaveLength(2);
      expect(screen.getAllByText("7:00p-9:59p")).toHaveLength(1);
      expect(screen.getByText("10/24/2024")).toBeInTheDocument();
      expect(screen.getByText("11/21/2024")).toBeInTheDocument();
      expect(screen.getByText("12/07/2024")).toBeInTheDocument();

      const lectureSelect = screen.getByRole("combobox", {
        name: "SelectLecture",
      });
      await user.selectOptions(lectureSelect, "A00");

      const discussionSelect = screen.getByRole("combobox", {
        name: "SelectDiscussion",
      });
      await user.selectOptions(discussionSelect, "A01");

      rerender(
        <CourseForm
          courseRepository={courseRepository}
          courseList={courseList}
          setCourseList={setCourseList}
        />,
      );

      expect(screen.getByText("TuTh")).toBeInTheDocument();
      expect(screen.getByText("9:30a-10:50a")).toBeInTheDocument();

      expect(screen.getByText("W")).toBeInTheDocument();
      expect(screen.getByText("4:00p-4:50p")).toBeInTheDocument();

      const submitCourse = screen.getByRole("button", { name: "Submit" });
      user.click(submitCourse);

      expect(courseList).toHaveLength(1);
      const course = courseList[0];

      expect(course.department).toBe("MATH");
      expect(course.courseNum).toBe("20C");
      expect(course.sections).toHaveLength(1);

      const section = course.sections[0];
      expect(section.sectionNum).toBe("A00");
      expect(section.activities).toHaveLength(2);
      expect(section.exams).toHaveLength(3);

      const lecture = section.activities.find((a) => a.type === "LE");
      const discussion = section.activities.find((a) => a.type === "DI");

      expect(lecture).toBeDefined();
      expect(lecture?.sectionNum).toBe("A00");
      expect(lecture?.daysOfWeek).toBe("TuTh");
      expect(lecture?.timeOfDay).toBe("9:30a-10:50a");
      expect(lecture?.building).toBe("JEANN");
      expect(lecture?.room).toBe("AUD");

      expect(discussion).toBeDefined();
      expect(discussion?.sectionNum).toBe("A01");
      expect(discussion?.daysOfWeek).toBe("W");
      expect(discussion?.timeOfDay).toBe("4:00p-4:50p");
      expect(discussion?.building).toBe("PODEM");
      expect(discussion?.room).toBe("1A20");
    });

    test("Test Choose Different Department", async () => {
      const { rerender } = render(
        <CourseForm
          courseRepository={courseRepository}
          courseList={courseList}
          setCourseList={setCourseList}
        />,
      );

      const departmentSelect = screen.getByRole("combobox", {
        name: "Department",
      });

      await user.selectOptions(departmentSelect, "MATH");
      rerender(
        <CourseForm
          courseRepository={courseRepository}
          courseList={courseList}
          setCourseList={setCourseList}
        />,
      );

      const courseNumSelect = screen.getByRole("combobox", {
        name: "CourseNum",
      });
      await user.selectOptions(courseNumSelect, "20C");
      rerender(
        <CourseForm
          courseRepository={courseRepository}
          courseList={courseList}
          setCourseList={setCourseList}
        />,
      );

      const sectionNumSelect = screen.getByRole("combobox", {
        name: "SectionNum",
      });
      await user.selectOptions(sectionNumSelect, "A00");
      rerender(
        <CourseForm
          courseRepository={courseRepository}
          courseList={courseList}
          setCourseList={setCourseList}
        />,
      );

      const lectureSelect = screen.getByRole("combobox", {
        name: "SelectLecture",
      });
      await user.selectOptions(lectureSelect, "A00");

      const discussionSelect = screen.getByRole("combobox", {
        name: "SelectDiscussion",
      });
      await user.selectOptions(discussionSelect, "A01");

      rerender(
        <CourseForm
          courseRepository={courseRepository}
          courseList={courseList}
          setCourseList={setCourseList}
        />,
      );

      await user.selectOptions(departmentSelect, "CSE");
      rerender(
        <CourseForm
          courseRepository={courseRepository}
          courseList={courseList}
          setCourseList={setCourseList}
        />,
      );

      expect(screen.getByText("Course")).toBeInTheDocument();
      expect(screen.getByText("120")).toBeInTheDocument();
      expect(screen.getByText("170")).toBeInTheDocument();
      expect(screen.queryByText("20C")).not.toBeInTheDocument();

      expect(screen.queryByRole("combobox", { name: "SectionNum" })).toBeNull();
      expect(
        screen.queryByRole("combobox", { name: "SelectLecture" }),
      ).toBeNull();
      expect(
        screen.queryByRole("combobox", { name: "SelectDiscussion" }),
      ).toBeNull();
      expect(screen.queryByRole("combobox", { name: "SelectLab" })).toBeNull();
      expect(
        screen.queryByRole("combobox", { name: "SelectStudio" }),
      ).toBeNull();

      const departmentSelect2 = screen.getByRole("combobox", {
        name: "Department",
      }) as HTMLSelectElement;

      const courseNumSelect2 = screen.getByRole("combobox", {
        name: "CourseNum",
      }) as HTMLSelectElement;

      expect(departmentSelect2.value).toBe("CSE");
      expect(courseNumSelect2.value).toBe("");
    });

    test("Test Choose Different Course Number", async () => {
      const { rerender } = render(
        <CourseForm
          courseRepository={courseRepository}
          courseList={courseList}
          setCourseList={setCourseList}
        />,
      );

      const departmentSelect = screen.getByRole("combobox", {
        name: "Department",
      });

      await user.selectOptions(departmentSelect, "CSE");
      rerender(
        <CourseForm
          courseRepository={courseRepository}
          courseList={courseList}
          setCourseList={setCourseList}
        />,
      );

      const courseNumSelect = screen.getByRole("combobox", {
        name: "CourseNum",
      });
      await user.selectOptions(courseNumSelect, "120");
      rerender(
        <CourseForm
          courseRepository={courseRepository}
          courseList={courseList}
          setCourseList={setCourseList}
        />,
      );

      const sectionNumSelect = screen.getByRole("combobox", {
        name: "SectionNum",
      });
      await user.selectOptions(sectionNumSelect, "A00");
      rerender(
        <CourseForm
          courseRepository={courseRepository}
          courseList={courseList}
          setCourseList={setCourseList}
        />,
      );

      const lectureSelect = screen.getByRole("combobox", {
        name: "SelectLecture",
      });
      await user.selectOptions(lectureSelect, "A00");

      const discussionSelect = screen.getByRole("combobox", {
        name: "SelectDiscussion",
      });
      await user.selectOptions(discussionSelect, "A01");

      rerender(
        <CourseForm
          courseRepository={courseRepository}
          courseList={courseList}
          setCourseList={setCourseList}
        />,
      );

      await user.selectOptions(courseNumSelect, "170");
      rerender(
        <CourseForm
          courseRepository={courseRepository}
          courseList={courseList}
          setCourseList={setCourseList}
        />,
      );

      expect(screen.getByText("Course")).toBeInTheDocument();
      expect(screen.getByText("120")).toBeInTheDocument();
      expect(screen.getByText("170")).toBeInTheDocument();

      expect(
        screen.queryByRole("combobox", { name: "SectionNum" }),
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("combobox", { name: "SelectLecture" }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("combobox", { name: "SelectDiscussion" }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("combobox", { name: "SelectLab" }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("combobox", { name: "SelectStudio" }),
      ).not.toBeInTheDocument();

      const courseNumSelect2 = screen.getByRole("combobox", {
        name: "CourseNum",
      }) as HTMLSelectElement;

      const sectionNumSelect2 = screen.getByRole("combobox", {
        name: "SectionNum",
      }) as HTMLSelectElement;

      expect(courseNumSelect2.value).toBe("170");
      expect(sectionNumSelect2.value).toBe("");
    });

    test("Test Choose Different Section Number", async () => {
      const { rerender } = render(
        <CourseForm
          courseRepository={courseRepository}
          courseList={courseList}
          setCourseList={setCourseList}
        />,
      );

      const departmentSelect = screen.getByRole("combobox", {
        name: "Department",
      });

      await user.selectOptions(departmentSelect, "MATH");
      rerender(
        <CourseForm
          courseRepository={courseRepository}
          courseList={courseList}
          setCourseList={setCourseList}
        />,
      );

      const courseNumSelect = screen.getByRole("combobox", {
        name: "CourseNum",
      });
      await user.selectOptions(courseNumSelect, "20C");
      rerender(
        <CourseForm
          courseRepository={courseRepository}
          courseList={courseList}
          setCourseList={setCourseList}
        />,
      );

      const sectionNumSelect = screen.getByRole("combobox", {
        name: "SectionNum",
      });
      await user.selectOptions(sectionNumSelect, "A00");
      rerender(
        <CourseForm
          courseRepository={courseRepository}
          courseList={courseList}
          setCourseList={setCourseList}
        />,
      );

      const lectureSelect = screen.getByRole("combobox", {
        name: "SelectLecture",
      });
      await user.selectOptions(lectureSelect, "A00");

      const discussionSelect = screen.getByRole("combobox", {
        name: "SelectDiscussion",
      });
      await user.selectOptions(discussionSelect, "A01");

      rerender(
        <CourseForm
          courseRepository={courseRepository}
          courseList={courseList}
          setCourseList={setCourseList}
        />,
      );

      await user.selectOptions(sectionNumSelect, "B00");
      rerender(
        <CourseForm
          courseRepository={courseRepository}
          courseList={courseList}
          setCourseList={setCourseList}
        />,
      );

      expect(
        screen.queryByRole("combobox", { name: "SelectLecture" }),
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("combobox", { name: "SelectDiscussion" }),
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("combobox", { name: "SelectLab" }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("combobox", { name: "SelectStudio" }),
      ).not.toBeInTheDocument();

      const sectionNumSelect2 = screen.getByRole("combobox", {
        name: "SectionNum",
      }) as HTMLSelectElement;

      const lectureSelect2 = screen.getByRole("combobox", {
        name: "SelectLecture",
      }) as HTMLSelectElement;

      const discussionSelect2 = screen.getByRole("combobox", {
        name: "SelectDiscussion",
      }) as HTMLSelectElement;

      expect(sectionNumSelect2.value).toBe("B00");
      expect(lectureSelect2.value).toBe("");
      expect(discussionSelect2.value).toBe("");
    });
  });
});

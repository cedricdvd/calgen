import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import CourseList from "@/app/components/CourseList/CourseList";
import Course from "@/lib/model/courses/course";
import Section from "@/lib/model/sections/section";

describe("Test CourseList", () => {
  test("Test Default Render", () => {
    render(<CourseList courses={[]} />);

    expect(screen.getByText("Courses")).toBeInTheDocument();
  });

  test("Test Course Render", () => {
    const courses: Course[] = [];

    courses.push(new Course("CSE", "110", [new Section("A00")]));
    courses.push(new Course("CSE", "111", [new Section("A00")]));
    courses.push(new Course("CSE", "112", [new Section("A00")]));
    courses.push(new Course("CSE", "113", [new Section("A00")]));

    render(<CourseList courses={courses} />);
    expect(screen.getByText("CSE 110")).toBeInTheDocument();
    expect(screen.getByText("CSE 111")).toBeInTheDocument();
    expect(screen.getByText("CSE 112")).toBeInTheDocument();
    expect(screen.getByText("CSE 113")).toBeInTheDocument();
  });
});

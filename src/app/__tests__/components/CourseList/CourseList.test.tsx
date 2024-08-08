import { render, screen } from "@testing-library/react";

import CourseList from "@/app/components/CourseList/CourseList";
import Course from "@/lib/model/courses/course";

describe("Test CourseList", () => {
  test("Test Default Render", () => {
    render(<CourseList courses={[]} />);

    expect(screen.getByText("Courses")).toBeInTheDocument();
  });

  test("Test Course Render", () => {
    const courses: Course[] = [];

    courses.push(new Course("CSE", "110"));
    courses.push(new Course("CSE", "111"));
    courses.push(new Course("CSE", "112"));
    courses.push(new Course("CSE", "113"));

    render(<CourseList courses={courses} />);
    expect(screen.getByText("CSE 110")).toBeInTheDocument();
    expect(screen.getByText("CSE 111")).toBeInTheDocument();
    expect(screen.getByText("CSE 112")).toBeInTheDocument();
    expect(screen.getByText("CSE 113")).toBeInTheDocument();
  });
});

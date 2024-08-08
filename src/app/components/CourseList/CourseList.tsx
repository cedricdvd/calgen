import CourseItem from "./CourseItem";
import ICourse from "@/lib/model/courses/course-interface";

interface CourseListProps {
  courses: ICourse[];
}

function CourseList({ courses }: CourseListProps) {
  return (
    <div className="course-list">
      <h1>Courses</h1>
      {courses.map((course: ICourse, index: number) => (
        <CourseItem key={index} course={course} />
      ))}
    </div>
  );
}

export default CourseList;

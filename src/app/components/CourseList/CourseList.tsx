import CourseItem from "./CourseItem";
import Course from "@/lib/model/course";

interface CourseListProps {
  courses: Course[];
}

/**
 * Displays a course and its section info.
 *
 * @param course Formatted course to be displayed. Already formatted to have
 * one section and at most sectionItem for each sectionType.
 */
function CourseList({ courses }: CourseListProps) {
  return <div></div>;
}

export default CourseList;

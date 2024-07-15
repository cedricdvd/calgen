import SectionItem from "./SectionItem";
import ExamItem from "./ExamItem";

import SectionInfo from "@/lib/model/section-info";
import ExamInfo from "@/lib/model/exam-info";
import Course from "@/lib/model/course";
import CourseSection from "@/lib/model/course-section";

interface CourseItemProps {
  course: Course;
}

function CourseItem({ course }: CourseItemProps) {
  return <div></div>;
}

export default CourseItem;

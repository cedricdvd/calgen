import ActivityItem from "./ActivityItem";
import ExamItem from "./ExamItem";

import ICourse from "@/lib/model/courses/course-interface";
import ISection from "@/lib/model/sections/section-interface";
import IActivity from "@/lib/model/activities/activity-interface";
import IExam from "@/lib/model/exams/exam-interface";
interface CourseItemProps {
  course: ICourse;
}

function CourseItem({ course }: CourseItemProps) {
  const section: ISection = course.sections[0];

  return (
    <div className="course-item">
      <div>{course.courseName}</div>
      {section.activities.length > 0 && (
        <div className="activity-list">
          <div className="activity-header">
            <p>Section</p>
            <p>Type</p>
            <p>Days of Week</p>
            <p>Time</p>
            <p>Location</p>
          </div>
          {section.activities.map((activity: IActivity, index: number) => (
            <ActivityItem key={index} activity={activity} />
          ))}
        </div>
      )}

      {section.exams.length > 0 && (
        <div className="exam-list">
          <div className="exam-header">
            <p>Type</p>
            <p>Day of Week</p>
            <p>Date</p>
            <p>Time</p>
            <p>Location</p>
          </div>
          {section.exams.map((exam: IExam, index: number) => (
            <ExamItem key={index} exam={exam} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseItem;

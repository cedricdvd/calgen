import Activity from "@/lib/model/activities/activity";
import Exam from "@/lib/model/exams/exam";

interface ISection {
  get sectionNum(): string;
  get activities(): Activity[];
  get exams(): Exam[];
  addActivity(activity: Activity): void;
  addExam(exam: Exam): void;
}

export default ISection;

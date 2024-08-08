import IExam from "@/lib/model/exams/exam-interface";

interface ExamItemProps {
  exam: IExam;
}

function ExamItem({ exam }: ExamItemProps) {
  return (
    <div className="exam-item">
      <div>{exam.type}</div>
      <div>{exam.dayOfWeek}</div>
      <div>{exam.date}</div>
      <div>{exam.timeOfDay}</div>
      <div>{exam.location}</div>
    </div>
  );
}

export default ExamItem;

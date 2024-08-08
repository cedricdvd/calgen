import IExam from "@/lib/model/exams/exam-interface";

interface ExamItemProps {
  exam: IExam;
}

function ExamItem({ exam }: ExamItemProps) {
  return (
    <div className="exam-item">
      <p>{exam.type}</p>
      <p>{exam.dayOfWeek}</p>
      <p>{exam.date}</p>
      <p>{exam.timeOfDay}</p>
      <p>{exam.location}</p>
    </div>
  );
}

export default ExamItem;

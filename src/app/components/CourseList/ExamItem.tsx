import ExamInfo from "@/lib/model/exam-info";

interface ExamItemProps {
  examType: string;
  exam: ExamInfo;
}

function ExamItem({ examType, exam }: ExamItemProps) {
  return (
    <div className="grid-container">
      <div className="grid-item">{examType}</div>
      <div className="grid-item">{exam.date}</div>
      <div className="grid-item">{exam.days}</div>
      <div className="grid-item">{exam.time}</div>
      <div className="grid-item">{exam.building}</div>
      <div className="grid-item">{exam.room}</div>
    </div>
  );
}

export default ExamItem;

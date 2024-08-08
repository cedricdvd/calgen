import Exam from "@/lib/model/exams/exam";

interface ExamDetailsProps {
  exams: Exam[];
}

function ExamDetails({ exams }: ExamDetailsProps) {
  return (
    <>
      <h2>Exams</h2>
      <div className="exam-details">
        {exams.length === 0 ? (
          <p>No exams</p>
        ) : (
          exams.map((exam, index) => (
            <div className="exam-details-item" key={index}>
              <p>{exam.type}</p>
              <p>{exam.date}</p>
              <p>{exam.timeOfDay}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default ExamDetails;

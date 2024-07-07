import Course from "@/lib/model/course";
import Select from "../ui/Select";

interface LectureDetailsProps {
  course: Course;
  sectionTitle: string;
  setSectionTitle: (value: string) => void;
}

function LectureDetails({
  course: course,
  sectionTitle: sectionTitle,
  setSectionTitle: setSectionTitle,
}: LectureDetailsProps) {
  return (
    <div>
      <Select
        options={course.getSectionNumbers()}
        selected={sectionTitle}
        setSelected={setSectionTitle}
        disabledMessage={"Select a section"}
      />
    </div>
  );
}

export default LectureDetails;

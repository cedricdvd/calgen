import Course from "@/lib/model/course";
import Select from "../ui/Select";

interface LectureDetailsProps {
  course: Course;
  sectionTitle: string;
  setSectionTitle: (value: string) => void;
  handleSelect: (setSelected: (value: string) => void, value: string) => void;
}

function LectureDetails({
  course,
  sectionTitle,
  setSectionTitle,
  handleSelect,
}: LectureDetailsProps) {
  return (
    <div>
      <Select
        options={course.getSectionNumbers()}
        selected={sectionTitle}
        setSelected={setSectionTitle}
        handleSelected={handleSelect}
        disabledMessage={"Select a section"}
      />
    </div>
  );
}

export default LectureDetails;

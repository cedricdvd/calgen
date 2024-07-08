import SimpleRepo from "@/lib/database/simple-repo";
import Select from "../ui/Select";

interface CourseDetailsProps {
  repo: SimpleRepo;
  department: string;
  setDepartment: (value: string) => void;
  courseNumber: string;
  setCourseNumber: (value: string) => void;
  handleSelect: (setSelected: (value: string) => void, value: string) => void;
}

function CourseDetails({
  repo,
  department,
  setDepartment,
  courseNumber,
  setCourseNumber,
  handleSelect,
}: CourseDetailsProps) {
  return (
    <div>
      <Select
        options={repo.getDepartments()}
        selected={department}
        setSelected={setDepartment}
        handleSelected={handleSelect}
        disabledMessage={"Select a department"}
      />
      {department !== "" && (
        <Select
          options={repo.getCourseNumbers(department)}
          selected={courseNumber}
          setSelected={setCourseNumber}
          handleSelected={handleSelect}
          disabledMessage={"Select a course number"}
        />
      )}
    </div>
  );
}

export default CourseDetails;

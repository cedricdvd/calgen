import SimpleRepo from "@/lib/database/simple-repo";
import Select from "../ui/Select";

interface CourseDetailsProps {
  repo: SimpleRepo;
  department: string;
  setDepartment: (value: string) => void;
  courseNumber: string;
  setCourseNumber: (value: string) => void;
}

function CourseDetails({
  repo,
  department,
  setDepartment,
  courseNumber,
  setCourseNumber,
}: CourseDetailsProps) {
  return (
    <div>
      <Select
        options={repo.getDepartments()}
        selected={department}
        setSelected={setDepartment}
        disabledMessage={"Select a department"}
      />
      {department !== "" && (
        <Select
          options={repo.getCourseNumbers(department)}
          selected={courseNumber}
          setSelected={setCourseNumber}
          disabledMessage={"Select a course number"}
        />
      )}
    </div>
  );
}

export default CourseDetails;

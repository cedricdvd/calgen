import SimpleRepo from "@/lib/database/simple-repo";
import Select from "../ui/Select";

interface CourseDetailsProps {
  courseRepository: SimpleRepo;
  department: string;
  courseNum: string;
  sectionNum: string;
  setDepartment: (value: string) => void;
  setCourseNum: (value: string) => void;
  setSectionNum: (value: string) => void;
  handleSelect: (setSelected: (value: string) => void, value: string) => void;
}

function CourseDetails({
  courseRepository,
  department,
  courseNum,
  sectionNum,
  setDepartment,
  setCourseNum,
  setSectionNum,
  handleSelect,
}: CourseDetailsProps) {
  return (
    <div>
      <h2>Course</h2>
      {courseRepository.getDepartments().length == 0 && (
        <p>No courses available</p>
      )}
      {courseRepository.getDepartments().length > 0 && (
        <div className="course-select">
          <p>Department</p>
          <Select
            options={courseRepository.getDepartments()}
            selected={department}
            setSelected={setDepartment}
            handleSelected={handleSelect}
            disabledMessage={"Select a department"}
            ariaLabel={"Department"}
          />
        </div>
      )}
      {courseRepository.getCoursesByDepartment(department).length > 0 && (
        <div className="course-select">
          <p>Course Number</p>
          <Select
            options={courseRepository.getCourseNumbers(department)}
            selected={courseNum}
            setSelected={setCourseNum}
            handleSelected={handleSelect}
            disabledMessage={"Select a course number"}
            ariaLabel={"CourseNum"}
          />
        </div>
      )}
      {courseRepository.getCourseByTitle(department, courseNum) !== null && (
        <div className="course-select">
          <p>Section Number</p>
          <Select
            options={
              courseRepository
                .getCourseByTitle(department, courseNum)
                ?.sections.map((section) => section.sectionNum) || []
            }
            selected={sectionNum}
            setSelected={setSectionNum}
            handleSelected={handleSelect}
            disabledMessage={"Select a section number"}
            ariaLabel={"SectionNum"}
          />
        </div>
      )}
    </div>
  );
}

export default CourseDetails;

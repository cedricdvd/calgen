import { useState } from "react";
import SimpleRepo from "@/lib/database/simple-repo";
import ICourse from "@/lib/model/courses/course-interface";
import ISection from "@/lib/model/sections/section-interface";
import CourseDetails from "./CourseDetails";
import ActivityDetails from "./ActivityDetails";
import ExamDetails from "./ExamDetails";

interface CourseFormProps {
  courseRepository: SimpleRepo;
  courseList: ICourse[];
  setCourseList: (value: ICourse[]) => void;
}

function CourseForm({
  courseRepository,
  courseList,
  setCourseList,
}: CourseFormProps) {
  const [department, setDepartment] = useState("");
  const [courseNum, setCourseNum] = useState("");
  const [sectionNum, setSectionNum] = useState("");

  const [lecture, setLecture] = useState("");
  const [lab, setLab] = useState("");
  const [discussion, setDiscussion] = useState("");
  const [studio, setStudio] = useState("");

  function handleSelect(setValue: (value: string) => void, value: string) {
    setValue(value);
    resetSelects(setValue);
  }

  function resetSelects(setValue: (value: string) => void) {
    if (setValue === setDepartment) {
      setCourseNum("");
      setSectionNum("");
      resetActivites();
    } else if (setValue === setCourseNum) {
      setSectionNum("");
      resetActivites();
    } else if (setValue === setSectionNum) {
      resetActivites();
    }
  }

  function onSubmit() {
    return;
  }

  function resetActivites() {
    setLecture("");
    setLab("");
    setDiscussion("");
    setStudio("");
  }

  return (
    <div className={"CourseForm"}>
      <CourseDetails
        courseRepository={courseRepository}
        department={department}
        courseNum={courseNum}
        sectionNum={sectionNum}
        setDepartment={setDepartment}
        setCourseNum={setCourseNum}
        setSectionNum={setSectionNum}
        handleSelect={handleSelect}
      />
      {sectionNum !== "" && (
        <>
          <ActivityDetails
            activities={
              courseRepository
                .getCourseByTitle(department, courseNum)
                ?.sections.find(
                  (section: ISection) => section.sectionNum === sectionNum,
                )?.activities || []
            }
            lecture={lecture}
            lab={lab}
            discussion={discussion}
            studio={studio}
            setLecture={setLecture}
            setLab={setLab}
            setDiscussion={setDiscussion}
            setStudio={setStudio}
          />
          <ExamDetails
            exams={
              courseRepository
                .getCourseByTitle(department, courseNum)
                ?.sections.find(
                  (section: ISection) => section.sectionNum === sectionNum,
                )?.exams || []
            }
          />
        </>
      )}
    </div>
  );
}

export default CourseForm;

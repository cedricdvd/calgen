import { useState } from "react";
import SimpleRepo from "@/lib/database/simple-repo";
import ICourse from "@/lib/model/courses/course-interface";
import ISection from "@/lib/model/sections/section-interface";
import CourseDetails from "./CourseDetails";
import ActivityDetails from "./ActivityDetails";
import ExamDetails from "./ExamDetails";
import Button from "../ui/Button";
import Course from "@/lib/model/courses/course";
import Section from "@/lib/model/sections/section";
import Lecture from "@/lib/model/activities/activity-types/lecture";
import Discussion from "@/lib/model/activities/activity-types/discussion";
import Studio from "@/lib/model/activities/activity-types/studio";
import Lab from "@/lib/model/activities/activity-types/lab";
import Midterm from "@/lib/model/exams/exam-types/midterm";
import Final from "@/lib/model/exams/exam-types/final";

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
    let selectedCourse: ICourse | null = courseRepository.getCourseByTitle(
      department,
      courseNum,
    );
    if (selectedCourse === null) {
      return;
    }

    let selectedSection: ISection | null =
      selectedCourse.sections.find(
        (section: ISection) => section.sectionNum === sectionNum,
      ) || null;
    if (selectedSection === null) {
      return;
    }

    let newCourse: ICourse = new Course(department, courseNum);
    let newSection: ISection = new Section(sectionNum);

    selectedSection.activities.forEach((activity) => {
      if (activity.type === "LE" && activity.sectionNum === lecture) {
        newSection.addActivity(
          new Lecture(
            activity.sectionNum,
            activity.daysOfWeek,
            activity.timeOfDay,
            activity.building,
            activity.room,
          ),
        );
      } else if (activity.type === "DI" && activity.sectionNum === discussion) {
        newSection.addActivity(
          new Discussion(
            activity.sectionNum,
            activity.daysOfWeek,
            activity.timeOfDay,
            activity.building,
            activity.room,
          ),
        );
      } else if (activity.type === "ST" && activity.sectionNum === studio) {
        newSection.addActivity(
          new Studio(
            activity.sectionNum,
            activity.daysOfWeek,
            activity.timeOfDay,
            activity.building,
            activity.room,
          ),
        );
      } else if (activity.type === "LA" && activity.sectionNum === lab) {
        newSection.addActivity(
          new Lab(
            activity.sectionNum,
            activity.daysOfWeek,
            activity.timeOfDay,
            activity.building,
            activity.room,
          ),
        );
      }
    });

    selectedSection.exams.forEach((exam) => {
      if (exam.type === "MI") {
        newSection.addExam(
          new Midterm(
            exam.date,
            exam.dayOfWeek,
            exam.timeOfDay,
            exam.building,
            exam.room,
          ),
        );
      }

      if (exam.type === "FI") {
        newSection.addExam(
          new Final(
            exam.date,
            exam.dayOfWeek,
            exam.timeOfDay,
            exam.building,
            exam.room,
          ),
        );
      }
    });

    newCourse.addSection(newSection);
    setCourseList([...courseList, newCourse]);
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
      <Button onClick={onSubmit} className={"Submit"} ariaLabel={"Submit"}>
        Submit
      </Button>
    </div>
  );
}

export default CourseForm;

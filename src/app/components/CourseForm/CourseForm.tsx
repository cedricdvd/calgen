"use client";

import { useState } from "react";

import SimpleRepo from "@/lib/database/simple-repo";
import Course from "@/lib/model/course";
import CourseSection from "@/lib/model/course-section";

import LectureDetails from "./LectureDetails";
import CourseDetails from "./CourseDetails";
import SectionDetails from "./SectionDetails";

function CourseForm() {
  const courseRepo = new SimpleRepo();
  courseRepo.fillExampleClasses();

  const [department, setDepartment] = useState("");
  const [courseNumber, setCourseNumber] = useState("");
  const [sectionTitle, setSectionTitle] = useState("");

  const [discussionSection, setDiscussionSection] = useState("");
  const [labSection, setLabSection] = useState("");
  const [studioSection, setStudioSection] = useState("");

  const [course, setCourse] = useState<Course | undefined>(undefined);
  const [section, setSection] = useState<CourseSection | undefined>(undefined);

  function onSubmitCourse(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const course = courseRepo.getCourse(`${department} ${courseNumber}`);
    if (course) {
      console.log(course);
      setCourse(course);
    } else {
      console.log("Course not found");
      setSection(undefined);
      setCourse(undefined);
    }
  }

  function onSubmitSection(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (course === undefined) {
      console.log("Course not found");
      return;
    }

    const section = course.getSection(sectionTitle);
    if (section) {
      console.log(section);
      setSection(section);
    } else {
      console.log("Section not found");
      setSection(undefined);
    }
  }

  function onSubmitSectionPart(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(discussionSection, labSection, studioSection);
  }

  return (
    <div>
      <form onSubmit={onSubmitCourse}>
        <CourseDetails
          repo={courseRepo}
          department={department}
          setDepartment={setDepartment}
          courseNumber={courseNumber}
          setCourseNumber={setCourseNumber}
        />

        <button type="submit">Submit</button>
      </form>

      {course !== undefined && (
        <form onSubmit={onSubmitSection}>
          <LectureDetails
            course={course}
            sectionTitle={sectionTitle}
            setSectionTitle={setSectionTitle}
          />
          <button type="submit">Submit</button>
        </form>
      )}

      {section !== undefined && (
        <form onSubmit={onSubmitSectionPart}>
          <SectionDetails
            section={section}
            discussionSection={discussionSection}
            labSection={labSection}
            studioSection={studioSection}
            setDiscussionSection={setDiscussionSection}
            setLabSection={setLabSection}
            setStudioSection={setStudioSection}
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default CourseForm;

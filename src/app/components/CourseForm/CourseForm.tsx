"use client";

import React, { useState } from "react";
import SimpleRepo from "@/lib/database/simple-repo";
import Course from "@/lib/model/course";
import CourseSection from "@/lib/model/course-section";
import LectureDetails from "./LectureDetails";
import CourseDetails from "./CourseDetails";
import SectionDetails from "./SectionDetails";
import CourseSectionBuilder from "@/lib/model/course-section-builder";
import SectionInfo from "@/lib/model/section-info";
import ExamInfo from "@/lib/model/exam-info";

function CourseForm() {
  const courseRepo = new SimpleRepo();
  courseRepo.fillExampleClasses();

  const [department, setDepartment] = useState("");
  const [courseNumber, setCourseNumber] = useState("");
  const [sectionNumber, setSectionNumber] = useState("");

  const [discussionSection, setDiscussionSection] = useState("");
  const [labSection, setLabSection] = useState("");
  const [studioSection, setStudioSection] = useState("");

  const [course, setCourse] = useState<Course | undefined>(undefined);
  const [section, setSection] = useState<CourseSection | undefined>(undefined);

  function handleSelect(setSelected: (value: string) => void, value: string) {
    setSelected(value);

    if (setSelected === setCourseNumber) {
      setCourse(courseRepo.getCourse(`${department} ${value}`));
    } else if (setSelected === setSectionNumber) {
      setSection(course?.getSection(value));
    }

    resetSelections(setSelected);
  }

  function resetSelections(setSelected: (value: string) => void) {
    if (setSelected === setDepartment) {
      setCourseNumber("");
      setSectionNumber("");
      setDiscussionSection("");
      setLabSection("");
      setStudioSection("");
      setCourse(undefined);
      setSection(undefined);
    }

    if (setSelected === setCourseNumber) {
      setSectionNumber("");
      setDiscussionSection("");
      setLabSection("");
      setStudioSection("");
      setSection(undefined);
    }

    if (setSelected === setSectionNumber) {
      setDiscussionSection("");
      setLabSection("");
      setStudioSection("");
    }
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      department === "" ||
      courseNumber === "" ||
      sectionNumber === "" ||
      (discussionSection === "" && labSection === "" && studioSection === "")
    ) {
      console.log("onSubmit: Missing required fields");
      return;
    }

    if (course === undefined || section === undefined) {
      console.log("onSubmit: Invalid course or section");
      return;
    }

    const newSection = new CourseSectionBuilder();

    newSection.withSection(sectionNumber);
    newSection.withLecture(SectionInfo.fromSectionInfo(section.lecture));

    if (discussionSection !== "") {
      const discussion = section.discussions.get(discussionSection);
      if (discussion === undefined) {
        console.log("onSubmit: Discussion not found");
        return;
      }

      newSection.withDiscussions(
        new Map([[discussionSection, SectionInfo.fromSectionInfo(discussion)]]),
      );
    }

    if (labSection !== "") {
      const lab = section.labs.get(labSection);
      if (lab === undefined) {
        console.log("onSubmit: Lab not found");
        return;
      }

      newSection.withLabs(
        new Map([[labSection, SectionInfo.fromSectionInfo(lab)]]),
      );
    }

    if (studioSection !== "") {
      const studio = section.studio.get(studioSection);
      if (studio === undefined) {
        console.log("onSubmit: Studio not found");
        return;
      }

      newSection.withStudio(
        new Map([[studioSection, SectionInfo.fromSectionInfo(studio)]]),
      );
    }

    newSection.withMidterms(
      section.midterms.map((midterm) => ExamInfo.fromExamInfo(midterm)),
    );
    newSection.withFinal(ExamInfo.fromExamInfo(section.final));

    const newClass = new Course(
      department,
      courseNumber,
      new Map([[sectionNumber, newSection.build()]]),
    );

    console.log(newClass);
  }

  return (
    <div>
      <form onSubmit={onSubmit} role="form">
        <CourseDetails
          repo={courseRepo}
          department={department}
          setDepartment={setDepartment}
          courseNumber={courseNumber}
          setCourseNumber={setCourseNumber}
          handleSelect={handleSelect}
        />

        {course !== undefined && (
          <LectureDetails
            course={course}
            sectionTitle={sectionNumber}
            setSectionTitle={setSectionNumber}
            handleSelect={handleSelect}
          />
        )}

        {section !== undefined && (
          <SectionDetails
            section={section}
            discussionSection={discussionSection}
            labSection={labSection}
            studioSection={studioSection}
            setDiscussionSection={setDiscussionSection}
            setLabSection={setLabSection}
            setStudioSection={setStudioSection}
          />
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CourseForm;

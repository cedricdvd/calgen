import React, { useState } from "react";
import SimpleRepo from "@/lib/database/simple-repo";
import Course from "@/lib/model/course";
import CourseSection from "@/lib/model/course-section";
import LectureDetails from "./LectureDetails";
import CourseDetails from "./CourseDetails";
import SectionDetails from "./SectionDetails";
import CourseSectionBuilder from "@/lib/model/course-section-builder";
import SectionInfo from "@/lib/model/section-info";

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
    resetSelections(setSelected);
  }

  function resetSelections(setSelected: (value: string) => void) {
    if (setSelected === setDepartment) {
      setCourseNumber("");
      setSectionNumber("");
      setDiscussionSection("");
      setLabSection("");
      setStudioSection("");
    }

    if (setSelected === setCourseNumber) {
      setSectionNumber("");
      setDiscussionSection("");
      setLabSection("");
      setStudioSection("");
    }

    if (setSelected === setSectionNumber) {
      setDiscussionSection("");
      setLabSection("");
      setStudioSection("");
    }
  }

  function onSubmitCourse(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(department, courseNumber);
    const course = courseRepo.getCourse(`${department} ${courseNumber}`);
    if (course) {
      console.log(course);
      setCourse(course);
    } else {
      console.log("SubmitCourse: Course not found");
      setSection(undefined);
      setCourse(undefined);
    }
  }

  function onSubmitSection(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (course === undefined) {
      console.log("SubmitSection: Course not found");
      return;
    }

    const section = course.getSection(sectionNumber);
    if (section) {
      console.log(section);
      setSection(section);
    } else {
      console.log("SubmitSection: Section not found");
      setSection(undefined);
    }
  }

  function onSubmitSectionPart(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (section === undefined) {
      console.log("SubmitSectionPart: Section not found");
      return;
    }

    if (discussionSection === "" && labSection === "" && studioSection === "") {
      console.log("SubmitSectionPart: No section parts selected");
      return;
    }

    console.log("Course:", department, courseNumber);
    console.log("Section:", sectionNumber);

    const sectionBuilder = new CourseSectionBuilder();
    sectionBuilder.withSection(sectionNumber);
    sectionBuilder.withLecture(SectionInfo.fromSectionInfo(section.lecture));

    if (discussionSection !== "") {
      console.log("Discussion:", discussionSection);
      const discussion = section.discussions.get(discussionSection);
      if (discussion === undefined) {
        return;
      }

      sectionBuilder.withDiscussions(
        new Map([[discussionSection, SectionInfo.fromSectionInfo(discussion)]]),
      );
    }

    if (labSection !== "") {
      console.log("Lab:", labSection);
      const lab = section.labs.get(labSection);
      if (lab === undefined) {
        return;
      }

      sectionBuilder.withLabs(
        new Map([[labSection, SectionInfo.fromSectionInfo(lab)]]),
      );
    }

    if (studioSection !== "") {
      console.log("Studio:", studioSection);
      const studio = section.studio.get(studioSection);
      if (studio === undefined) {
        return;
      }

      sectionBuilder.withStudio(
        new Map([[studioSection, SectionInfo.fromSectionInfo(studio)]]),
      );
    }

    const newSection = sectionBuilder.build();
    const newClass = new Course(
      department,
      courseNumber,
      new Map([[sectionNumber, newSection]]),
    );

    console.log(newClass);
  }

  return (
    <div>
      <form onSubmit={onSubmitCourse} role="form">
        <CourseDetails
          repo={courseRepo}
          department={department}
          setDepartment={setDepartment}
          courseNumber={courseNumber}
          setCourseNumber={setCourseNumber}
          handleSelect={handleSelect}
        />

        <button type="submit">Submit</button>
      </form>

      {course !== undefined && (
        <form onSubmit={onSubmitSection} role="form">
          <LectureDetails
            course={course}
            sectionTitle={sectionNumber}
            setSectionTitle={setSectionNumber}
            handleSelect={handleSelect}
          />
          <button type="submit">Submit</button>
        </form>
      )}

      {section !== undefined && (
        <form onSubmit={onSubmitSectionPart} role="form">
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

"use client";
import { useState } from "react";

import CourseList from "@/app/components/CourseList/CourseList";
import CourseForm from "@/app/components/CourseForm/CourseForm";
import CourseCalendar from "../Calendar/CourseCalendar";

import ICourse from "@/lib/model/courses/course-interface";
import SimpleRepo from "@/lib/database/simple-repo";

function CourseDisplay() {
  let [courses, setCourses] = useState<ICourse[]>([]);
  let repo: SimpleRepo = new SimpleRepo();
  repo.fillExampleCourses();

  return (
    <div>
      <CourseList courses={courses} />
      <CourseForm
        courseRepository={repo}
        setCourseList={setCourses}
        courseList={courses}
      />
      <CourseCalendar courses={courses} />
    </div>
  );
}

export default CourseDisplay;

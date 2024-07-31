import ICourse from "../model/courses/course-interface";

import Course from "../model/courses/course";
import Section from "../model/sections/section";
import exampleClasses, { SectionDetails } from "../data/example-data";
import Lecture from "../model/activities/activity-types/lecture";
import Lab from "../model/activities/activity-types/lab";
import Discussion from "../model/activities/activity-types/discussion";
import Studio from "../model/activities/activity-types/studio";
import Midterm from "../model/exams/exam-types/midterm";
import Final from "../model/exams/exam-types/final";

class SimpleRepo {
  private courses: Map<number, ICourse>;
  private nextId: number;

  public constructor(courses?: Course[]) {
    this.courses = new Map<number, ICourse>();
    this.nextId = 0;

    if (courses) {
      courses.forEach((course) => this.addCourse(course));
    }
  }

  public addCourse(course: ICourse): ICourse {
    course = course.withId(this.nextId);
    this.courses.set(this.nextId, course);
    this.nextId++;
    return course;
  }

  public getCourseById(id: number): ICourse | null {
    return this.courses.get(id) || null;
  }

  public getAllCourses(): ICourse[] {
    return Array.from(this.courses.values());
  }

  public getDepartments(): string[] {
    return Array.from(
      new Set(
        Array.from(this.courses.values()).map((course) => course.department),
      ),
    );
  }

  public getCoursesByDepartment(department: string): ICourse[] {
    return Array.from(this.courses.values()).filter((course) => {
      return course.department === department;
    });
  }

  public getCourseNumbers(department: string): string[] {
    let filteredCourses: ICourse[] = this.getCoursesByDepartment(department);
    return filteredCourses.map((course) => {
      return course.courseNum;
    });
  }

  public getCourseByTitle(
    department: string,
    courseNum: string,
  ): ICourse | null {
    let filteredCourses: ICourse[] = this.getCoursesByDepartment(department);
    return (
      filteredCourses.find((course) => course.courseNum === courseNum) || null
    );
  }

  public updateCoures(id: number, course: ICourse): void {
    course = course.withId(id);
    this.courses.set(id, course);
  }

  public deleteCourse(id: number): void {
    this.courses.delete(id);
  }

  public clear(): void {
    this.courses.clear();
    this.nextId = 0;
  }

  public fillExampleCourses(): void {
    for (const courseName in exampleClasses) {
      const department: string = courseName.split(" ")[0];
      const courseNum: string = courseName.split(" ")[1];
      const course: Course = new Course(department, courseNum);

      for (const sectionNumber in exampleClasses[courseName]) {
        this.addSectionFromInfo(
          course,
          sectionNumber,
          exampleClasses[courseName][sectionNumber],
        );
      }
      this.addCourse(course);
    }
  }

  private addSectionFromInfo(
    course: ICourse,
    sectionNumber: string,
    details: SectionDetails,
  ): void {
    const section: Section = new Section(sectionNumber);

    if (details.LE) {
      for (const key in details.LE) {
        section.addActivity(
          new Lecture(
            key,
            details.LE[key].Days,
            details.LE[key].Time,
            details.LE[key].Building || "TBA",
            details.LE[key].Room || "TBA",
          ),
        );
      }
    }

    if (details.LA) {
      for (const key in details.LA) {
        section.addActivity(
          new Lab(
            key,
            details.LA[key].Days,
            details.LA[key].Time,
            details.LA[key].Building || "TBA",
            details.LA[key].Room || "TBA",
          ),
        );
      }
    }

    if (details.DI) {
      for (const key in details.DI) {
        section.addActivity(
          new Discussion(
            key,
            details.DI[key].Days,
            details.DI[key].Time,
            details.DI[key].Building || "TBA",
            details.DI[key].Room || "TBA",
          ),
        );
      }
    }

    if (details.ST) {
      for (const key in details.ST) {
        section.addActivity(
          new Studio(
            key,
            details.ST[key].Days,
            details.ST[key].Time,
            details.ST[key].Building || "TBA",
            details.ST[key].Room || "TBA",
          ),
        );
      }
    }

    if (details.MI) {
      for (const exam of details.MI) {
        section.addExam(
          new Midterm(
            exam.Date,
            exam.Days,
            exam.Time,
            exam.Building || "TBA",
            exam.Room || "TBA",
          ),
        );
      }
    }

    if (details.FI) {
      section.addExam(
        new Final(
          details.FI.Date,
          details.FI.Days,
          details.FI.Time,
          details.FI.Building || "TBA",
          details.FI.Room || "TBA",
        ),
      );
    }

    course.addSection(section);
  }
}

export default SimpleRepo;

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
    return [];
  }

  public getCoursesByDepartment(department: string): ICourse[] {
    return [];
  }

  public getCourseNumbers(department: string): string[] {
    return [];
  }

  public updateCoures(id: number, course: ICourse): void {
    return;
  }

  public deleteCourse(id: number): void {
    return;
  }

  public clear(): void {
    return;
  }

  public fillExampleCourses(): void {
    return;
  }
}

export default SimpleRepo;

// public constructor() {
// this.courses = new Map<number, ICourse>();
// this.nextId = 0;
// }

// public addCourse(course: ICourse): void {
// if (course.id === -1) {
// course = course.withId(this.nextId);
// this.nextId++;
// } else {
// this.nextId = Math.max(this.nextId, course.id);
// }

// this.courses.set(course.id, course);
// }

// public getCourse(id: number): ICourse | null {
// return this.courses.get(id) || null;
// }

// public updateCourse(id: number, course: ICourse): void {
// this.courses.set(id, course.withId(id));
// }

// public deleteCourse(id: number): void {
// this.courses.delete(id);
// }

// public getDepartments(): string[] {
// let departments = new Set<string>();
// this.courses.forEach((course) => departments.add(course.department));
// return Array.from(departments);
// }

// public getCourseNumbers(department: string): string[] {
// let courseNumbers = new Set<string>();
// this.courses.forEach((course) => {
// if (course.department === department) {
// courseNumbers.add(course.courseNum);
// }
// });
// return Array.from(courseNumbers);
// }

// public getCourseFromName(courseName: string): ICourse | null {
// for (let course of Array.from(this.courses.values())) {
// if (course.courseName === courseName) {
// return course;
// }
// }

// return null;
// }

// public fillExampleClasses(): void {
// for (const courseName in exampleClasses) {
// const department: string = courseName.split(" ")[0];
// const courseNum: string = courseName.split(" ")[1];
// const course: ICourse = new Course(department, courseNum);

// for (const sectionNumber in exampleClasses[courseName]) {
// const section: Section = new Section(sectionNumber);

// const details: SectionDetails =
// exampleClasses[courseName][sectionNumber];

// if (details.LE) {
// for (const key in details.LE) {
// section.addActivity(
// new Lecture(
// key,
// details.LE[key].Days,
// details.LE[key].Time,
// details.LE[key].Building || "TBA",
// details.LE[key].Room || "TBA",
// ),
// );
// }
// }

// if (details.LA) {
// for (const key in details.LA) {
// section.addActivity(
// new Lab(
// key,
// details.LA[key].Days,
// details.LA[key].Time,
// details.LA[key].Building || "TBA",
// details.LA[key].Room || "TBA",
// ),
// );
// }
// }

// if (details.DI) {
// for (const key in details.DI) {
// section.addActivity(
// new Discussion(
// key,
// details.DI[key].Days,
// details.DI[key].Time,
// details.DI[key].Building || "TBA",
// details.DI[key].Room || "TBA",
// ),
// );
// }
// }

// if (details.ST) {
// for (const key in details.ST) {
// section.addActivity(
// new Studio(
// key,
// details.ST[key].Days,
// details.ST[key].Time,
// details.ST[key].Building || "TBA",
// details.ST[key].Room || "TBA",
// ),
// );
// }
// }

// if (details.MI) {
// for (const exam of details.MI) {
// section.addExam(
// new Midterm(
// exam.Date,
// exam.Days,
// exam.Time,
// exam.Building || "TBA",
// exam.Room || "TBA",
// ),
// );
// }
// }

// if (details.FI) {
// section.addExam(
// new Final(
// details.FI.Date,
// details.FI.Days,
// details.FI.Time,
// details.FI.Building || "TBA",
// details.FI.Room || "TBA",
// ),
// );
// }

// course.addSection(section);
// }

// this.addCourse(course);
// }
// }
// }

// export default SimpleRepo;

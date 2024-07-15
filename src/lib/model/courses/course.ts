import Section from "../sections/section";
import ICourse from "./course-interface";

class Course implements ICourse {
  private _department: string;
  private _courseNum: string;
  private _sections: Section[];

  constructor(department: string, courseNum: string) {
    this._department = department;
    this._courseNum = courseNum;
    this._sections = [];
  }

  public get department(): string {
    return this._department;
  }

  public get courseNum(): string {
    return this._courseNum;
  }

  public get courseName(): string {
    return `${this.department} ${this.courseNum}`;
  }

  public get sections(): Section[] {
    return this._sections;
  }

  public addSection(section: Section): void {
    this._sections.push(section);
  }
}

export default Course;

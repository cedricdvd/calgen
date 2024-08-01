import Section from "../sections/section";
import ICourse from "./course-interface";
import ISection from "../sections/section-interface";

class Course implements ICourse {
  private _id: number;
  private _department: string;
  private _courseNum: string;
  private _sections: ISection[];

  constructor(
    department: string,
    courseNum: string,
    sections?: ISection[],
    id?: number,
  ) {
    this._department = department;
    this._courseNum = courseNum;
    this._sections = sections || [];
    this._id = id || -1;
  }

  public get id(): number {
    return this._id;
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

  public get sections(): ISection[] {
    return this._sections;
  }

  public addSection(section: Section): void {
    this._sections.push(section);
  }

  public withId(id: number): ICourse {
    return new Course(this.department, this.courseNum, this.sections, id);
  }
}

export default Course;

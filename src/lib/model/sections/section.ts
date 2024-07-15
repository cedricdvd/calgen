import ISection from "./section-interface";
import Activity from "../activities/activity";
import Exam from "../exams/exam";

class Section implements ISection {
  private _sectionNum: string;
  private _activites: Activity[];
  private _exams: Exam[];

  constructor(sectionNum: string) {
    this._sectionNum = sectionNum;
    this._activites = [];
    this._exams = [];
  }

  public get sectionNum(): string {
    return this._sectionNum;
  }

  public get activites(): Activity[] {
    return this._activites;
  }

  public get exams(): Exam[] {
    return this._exams;
  }

  public addActivity(activity: Activity): void {
    this._activites.push(activity);
  }

  public addExam(exam: Exam): void {
    this._exams.push(exam);
  }
}

export default Section;

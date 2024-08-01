import Section from "../sections/section";
import ISection from "../sections/section-interface";

interface ICourse {
  get id(): number;
  get department(): string;
  get courseNum(): string;
  get courseName(): string;
  get sections(): ISection[];

  addSection(section: ISection): void;
  withId(id: number): ICourse;
}

export default ICourse;

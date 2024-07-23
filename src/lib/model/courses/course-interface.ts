import Section from "../sections/section";

interface ICourse {
  get id(): number;
  get department(): string;
  get courseNum(): string;
  get courseName(): string;
  get sections(): Section[];

  addSection(section: Section): void;
  withId(id: number): ICourse;
}

export default ICourse;

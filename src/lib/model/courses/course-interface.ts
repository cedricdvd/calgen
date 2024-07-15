import Section from "../sections/section";

interface ICourse {
  get department(): string;
  get courseNum(): string;
  get courseName(): string;
  get sections(): Section[];

  addSection(section: Section): void;
}

export default ICourse;

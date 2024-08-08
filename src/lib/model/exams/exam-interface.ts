interface IExam {
  get type(): string;
  get date(): string;
  get dayOfWeek(): string;
  get timeOfDay(): string;
  get building(): string;
  get room(): string;
  get location(): string;
}

export default IExam;

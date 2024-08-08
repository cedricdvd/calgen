interface IActivity {
  get type(): string;
  get sectionNum(): string;
  get daysOfWeek(): string;
  get timeOfDay(): string;
  get building(): string;
  get room(): string;
  get location(): string;
}

export default IActivity;

import IExam from "./exam-interface";

class Exam implements IExam {
  private _type: string;
  private _date: string;
  private _dayOfWeek: string;
  private _timeOfDay: string;
  private _building: string;
  private _room: string;

  constructor(
    type: string,
    date: string,
    dayOfWeek: string,
    timeOfDay: string,
    building: string,
    room: string,
  ) {
    this._type = type;
    this._date = date;
    this._dayOfWeek = dayOfWeek;
    this._timeOfDay = timeOfDay;
    this._building = building;
    this._room = room;
  }

  public get type(): string {
    return this._type;
  }

  public get date(): string {
    return this._date;
  }

  public get dayOfWeek(): string {
    return this._dayOfWeek;
  }

  public get timeOfDay(): string {
    return this._timeOfDay;
  }

  public get building(): string {
    return this._building;
  }

  public get room(): string {
    return this._room;
  }

  public get location(): string {
    return `${this._building} ${this._room}`;
  }
}

export default Exam;

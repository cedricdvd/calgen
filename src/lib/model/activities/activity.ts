import IActivity from "./activity-interface";

class Activity implements IActivity {
  private _type: string;
  private _sectionNum: string;
  private _daysOfWeek: string;
  private _timeOfDay: string;
  private _building: string;
  private _room: string;

  constructor(
    type: string,
    sectionNum: string,
    daysOfWeek: string,
    timeOfDay: string,
    building: string,
    room: string,
  ) {
    this._type = type;
    this._sectionNum = sectionNum;
    this._daysOfWeek = daysOfWeek;
    this._timeOfDay = timeOfDay;
    this._building = building;
    this._room = room;
  }

  get type(): string {
    return this._type;
  }

  get sectionNum(): string {
    return this._sectionNum;
  }

  get daysOfWeek(): string {
    return this._daysOfWeek;
  }

  get timeOfDay(): string {
    return this._timeOfDay;
  }

  get building(): string {
    return this._building;
  }

  get room(): string {
    return this._room;
  }

  get location(): string {
    return `${this._building} ${this._room}`;
  }
}

export default Activity;

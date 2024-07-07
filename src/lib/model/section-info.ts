class SectionInfo {
  private _section: string;
  private _days: string;
  private _time: string;
  private _building: string;
  private _room: string;

  constructor(
    section: string,
    days: string,
    time: string,
    building: string,
    room: string,
  ) {
    this._section = section;
    this._days = days;
    this._time = time;
    this._building = building;
    this._room = room;
  }

  public get section(): string {
    return this._section;
  }

  public get days(): string {
    return this._days;
  }

  public get time(): string {
    return this._time;
  }

  public get building(): string {
    return this._building;
  }

  public get room(): string {
    return this._room;
  }

  public static fromSectionInfo(info: SectionInfo): SectionInfo {
    return new SectionInfo(
      info.section,
      info.days,
      info.time,
      info.building,
      info.room,
    );
  }
}

export default SectionInfo;

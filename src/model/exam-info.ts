class ExamInfo {
    private _date: string;
    private _days: string;
    private _time: string;
    private _building: string;
    private _room: string;

    constructor(date: string, days: string, time: string, building: string, room: string) {
        this._date = date;
        this._days = days;
        this._time = time;
        this._building = building;
        this._room = room;
    }

    public get date(): string {
        return this._date;
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
}

export default ExamInfo;

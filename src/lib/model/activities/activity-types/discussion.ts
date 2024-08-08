import Activity from "../activity";

class Discussion extends Activity {
  constructor(
    section: string,
    days: string,
    time: string,
    building: string,
    room: string,
  ) {
    super("DI", section, days, time, building, room);
  }
}

export default Discussion;

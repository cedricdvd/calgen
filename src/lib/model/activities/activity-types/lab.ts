import Activity from "../activity";

class Lab extends Activity {
  constructor(
    section: string,
    days: string,
    time: string,
    building: string,
    room: string,
  ) {
    super("LA", section, days, time, building, room);
  }
}

export default Lab;

import Activity from "../activity";

class Lecture extends Activity {
  constructor(
    section: string,
    days: string,
    time: string,
    building: string,
    room: string,
  ) {
    super("LE", section, days, time, building, room);
  }
}

export default Lecture;

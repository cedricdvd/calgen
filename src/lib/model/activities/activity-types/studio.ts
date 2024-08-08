import Activity from "../activity";

class Studio extends Activity {
  constructor(
    section: string,
    days: string,
    time: string,
    building: string,
    room: string,
  ) {
    super("ST", section, days, time, building, room);
  }
}

export default Studio;

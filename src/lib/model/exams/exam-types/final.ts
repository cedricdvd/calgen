import Exam from "../exam";

class Final extends Exam {
  constructor(
    date: string,
    dayOfWeek: string,
    timeOfDay: string,
    building: string,
    room: string,
  ) {
    super("FI", date, dayOfWeek, timeOfDay, building, room);
  }
}

export default Final;

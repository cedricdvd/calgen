import Exam from "../exam";

class Midterm extends Exam {
  constructor(
    date: string,
    dayOfWeek: string,
    timeOfDay: string,
    building: string,
    room: string,
  ) {
    super("MI", date, dayOfWeek, timeOfDay, building, room);
  }
}

export default Midterm;

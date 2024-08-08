import Midterm from "@/lib/model/exams/exam-types/midterm";
import Final from "@/lib/model/exams/exam-types/final";

describe("Test Exam Types", () => {
  test("Test Midterm", () => {
    const exam = new Midterm(
      "2021-10-15",
      "Friday",
      "9:00AM-11:00AM",
      "CSB",
      "130",
    );
    expect(exam.type).toBe("MI");
    expect(exam.date).toBe("2021-10-15");
    expect(exam.dayOfWeek).toBe("Friday");
    expect(exam.timeOfDay).toBe("9:00AM-11:00AM");
    expect(exam.building).toBe("CSB");
    expect(exam.room).toBe("130");
  });

  test("Test Final", () => {
    const exam = new Final(
      "2021-12-10",
      "Friday",
      "9:00AM-11:00AM",
      "CSB",
      "130",
    );
    expect(exam.type).toBe("FI");
    expect(exam.date).toBe("2021-12-10");
    expect(exam.dayOfWeek).toBe("Friday");
    expect(exam.timeOfDay).toBe("9:00AM-11:00AM");
    expect(exam.building).toBe("CSB");
    expect(exam.room).toBe("130");
  });
});

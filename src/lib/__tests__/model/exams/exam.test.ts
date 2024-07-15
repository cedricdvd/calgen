import Exam from "@/lib/model/exams/exam";

describe("Test Exam", () => {
  test("Test Exam Getters Midterm", () => {
    const exam = new Exam(
      "MI",
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

  test("Test Exam Getters Final", () => {
    const exam = new Exam(
      "FI",
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

import Activity from "@/lib/model/activities/activity";

describe("Test Activity", () => {
  test("Test Activity Getters Lecture", () => {
    const activity = new Activity(
      "LE",
      "A",
      "MWF",
      "9:00AM-9:50AM",
      "HSS",
      "1337",
    );
    expect(activity.type).toBe("LE");
    expect(activity.sectionNum).toBe("A");
    expect(activity.daysOfWeek).toBe("MWF");
    expect(activity.timeOfDay).toBe("9:00AM-9:50AM");
    expect(activity.building).toBe("HSS");
    expect(activity.room).toBe("1337");
    expect(activity.location).toBe("HSS 1337");
  });

  test("Test Activity Getters Discussion", () => {
    const activity = new Activity(
      "DI",
      "B",
      "TuTh",
      "12:00PM-12:50PM",
      "CSB",
      "130",
    );
    expect(activity.type).toBe("DI");
    expect(activity.sectionNum).toBe("B");
    expect(activity.daysOfWeek).toBe("TuTh");
    expect(activity.timeOfDay).toBe("12:00PM-12:50PM");
    expect(activity.building).toBe("CSB");
    expect(activity.room).toBe("130");
    expect(activity.location).toBe("CSB 130");
  });
});

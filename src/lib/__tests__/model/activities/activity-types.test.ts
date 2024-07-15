import Discussion from "@/lib/model/activities/activity-types/discussion";
import Lecture from "@/lib/model/activities/activity-types/lecture";
import Lab from "@/lib/model/activities/activity-types/lab";
import Studio from "@/lib/model/activities/activity-types/studio";

describe("Test Activity Types", () => {
  test("Test Lecture", () => {
    const activity = new Lecture("A", "MWF", "9:00AM-9:50AM", "HSS", "1337");
    expect(activity.type).toBe("LE");
    expect(activity.sectionNum).toBe("A");
    expect(activity.daysOfWeek).toBe("MWF");
    expect(activity.timeOfDay).toBe("9:00AM-9:50AM");
    expect(activity.building).toBe("HSS");
    expect(activity.room).toBe("1337");
    expect(activity.location).toBe("HSS 1337");
  });

  test("Test Discussion", () => {
    const activity = new Discussion(
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

  test("Test Lab", () => {
    const activity = new Lab("C", "M", "2:00PM-4:50PM", "CSB", "130");
    expect(activity.type).toBe("LA");
    expect(activity.sectionNum).toBe("C");
    expect(activity.daysOfWeek).toBe("M");
    expect(activity.timeOfDay).toBe("2:00PM-4:50PM");
    expect(activity.building).toBe("CSB");
    expect(activity.room).toBe("130");
    expect(activity.location).toBe("CSB 130");
  });

  test("Test Studio", () => {
    const activity = new Studio("D", "Tu", "2:00PM-4:50PM", "CSB", "130");
    expect(activity.type).toBe("ST");
    expect(activity.sectionNum).toBe("D");
    expect(activity.daysOfWeek).toBe("Tu");
    expect(activity.timeOfDay).toBe("2:00PM-4:50PM");
    expect(activity.building).toBe("CSB");
    expect(activity.room).toBe("130");
    expect(activity.location).toBe("CSB 130");
  });
});

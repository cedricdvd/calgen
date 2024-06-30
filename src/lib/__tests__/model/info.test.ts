import SectionInfo from "@/lib/model/section-info";
import ExamInfo from "@/lib/model/exam-info";

test("SectionInfo constructor", () => {
  const sectionInfo = new SectionInfo("A", "MWF", "12:00-12:50", "CSB", "130");
  expect(sectionInfo.section).toBe("A");
  expect(sectionInfo.days).toBe("MWF");
  expect(sectionInfo.time).toBe("12:00-12:50");
  expect(sectionInfo.building).toBe("CSB");
  expect(sectionInfo.room).toBe("130");
});

test("ExamInfo constructor", () => {
  const examInfo = new ExamInfo("12/15/2020", "T", "12:00-2:00", "CSB", "130");
  expect(examInfo.date).toBe("12/15/2020");
  expect(examInfo.days).toBe("T");
  expect(examInfo.time).toBe("12:00-2:00");
  expect(examInfo.building).toBe("CSB");
  expect(examInfo.room).toBe("130");
});

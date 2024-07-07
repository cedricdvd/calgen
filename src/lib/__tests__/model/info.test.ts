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

test("SectionInfo fromSectionInfo", () => {
  const sectionInfo = new SectionInfo("A", "MWF", "12:00-12:50", "CSB", "130");
  const newSectionInfo = SectionInfo.fromSectionInfo(sectionInfo);
  expect(newSectionInfo.section).toBe("A");
  expect(newSectionInfo.days).toBe("MWF");
  expect(newSectionInfo.time).toBe("12:00-12:50");
  expect(newSectionInfo.building).toBe("CSB");
  expect(newSectionInfo.room).toBe("130");
  expect(newSectionInfo).not.toBe(sectionInfo);
});

test("ExamInfo constructor", () => {
  const examInfo = new ExamInfo("12/15/2020", "T", "12:00-2:00", "CSB", "130");
  expect(examInfo.date).toBe("12/15/2020");
  expect(examInfo.days).toBe("T");
  expect(examInfo.time).toBe("12:00-2:00");
  expect(examInfo.building).toBe("CSB");
  expect(examInfo.room).toBe("130");
});

test("ExamInfo fromExamInfo", () => {
  const examInfo = new ExamInfo("12/15/2020", "T", "12:00-2:00", "CSB", "130");
  const newExamInfo = ExamInfo.fromExamInfo(examInfo);
  expect(newExamInfo.date).toBe("12/15/2020");
  expect(newExamInfo.days).toBe("T");
  expect(newExamInfo.time).toBe("12:00-2:00");
  expect(newExamInfo.building).toBe("CSB");
  expect(newExamInfo.room).toBe("130");
  expect(newExamInfo).not.toBe(examInfo);
});

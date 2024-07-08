import CourseSectionBuilder from "@/lib/model/course-section-builder";
import SectionInfo from "@/lib/model/section-info";
import ExamInfo from "@/lib/model/exam-info";

describe("CourseSectionBuilder", () => {
  let builder: CourseSectionBuilder;

  beforeEach(() => {
    builder = new CourseSectionBuilder();
  });

  test("Test with section", () => {
    builder.withSection("A00");
    expect(builder.build().section).toBe("A00");
  });

  test("Test with lecture", () => {
    let lecture = new SectionInfo("A00", "MWF", "10:00-10:50", "GH", "242");
    builder.withLecture(lecture);
    expect(builder.build().lecture).toBe(lecture);
  });

  test("Test with discussions", () => {
    let discussions = new Map<string, SectionInfo>();
    discussions.set(
      "A01",
      new SectionInfo("A01", "W", "4:00p-4:50p", "PETER", "108"),
    );
    discussions.set(
      "A02",
      new SectionInfo("A02", "W", "5:00p-5:50p", "PODEM", "1A20"),
    );
    builder.withDiscussions(discussions);
    expect(builder.build().discussions).toBe(discussions);
  });

  test("Test with labs", () => {
    let labs = new Map<string, SectionInfo>();
    labs.set("A50", new SectionInfo("A50", "Tu", "2:00p-4:50p", "WLH", "2005"));
    labs.set("A51", new SectionInfo("A51", "Th", "2:00p-4:50p", "WLH", "2005"));
    labs.set("A52", new SectionInfo("A52", "F", "2:00p-4:50p", "WLH", "2005"));
    builder.withLabs(labs);
    expect(builder.build().labs).toBe(labs);
  });

  test("Test with studio", () => {
    let studio = new Map<string, SectionInfo>();
    studio.set(
      "A60",
      new SectionInfo("A60", "M", "2:00p-4:50p", "WLH", "2005"),
    );
    builder.withStudio(studio);
    expect(builder.build().studio).toBe(studio);
  });

  test("Test with midterms", () => {
    let midterms = [
      new ExamInfo("10/24/2024", "Th", "9:00p-9:50p", "PETER", "108"),
      new ExamInfo("11/21/2024", "Th", "9:00p-9:50p", "PETER", "108"),
    ];
    builder.withMidterms(midterms);
    expect(builder.build().midterms).toBe(midterms);
  });

  test("Test with final", () => {
    let final = new ExamInfo("12/07/2024", "S", "7:00p-9:59p", "WLH", "2005");
    builder.withFinal(final);
    expect(builder.build().final).toBe(final);
  });
});

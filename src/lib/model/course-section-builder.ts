import ExamInfo from "./exam-info";
import Activity from "./activities/activity-interface";
import CourseSection from "./course-section";

class CourseSectionBuilder {
  private section: string;
  private lecture: Activity;
  private discussions: Map<string, Activity>;
  private labs: Map<string, Activity>;
  private studio: Map<string, Activity>;
  private midterms: ExamInfo[];
  private final: ExamInfo;

  constructor() {
    this.section = "";
    this.lecture = new Activity("", "", "", "", "");
    this.discussions = new Map<string, Activity>();
    this.labs = new Map<string, Activity>();
    this.studio = new Map<string, Activity>();
    this.midterms = [];
    this.final = new ExamInfo("", "", "", "", "");
  }

  public withSection(section: string): CourseSectionBuilder {
    this.section = section;
    return this;
  }

  public withLecture(lecture: Activity): CourseSectionBuilder {
    this.lecture = lecture;
    return this;
  }

  public withDiscussions(
    discussions: Map<string, Activity>,
  ): CourseSectionBuilder {
    this.discussions = discussions;
    return this;
  }

  public withLabs(labs: Map<string, Activity>): CourseSectionBuilder {
    this.labs = labs;
    return this;
  }

  public withStudio(studio: Map<string, Activity>): CourseSectionBuilder {
    this.studio = studio;
    return this;
  }

  public withMidterms(midterms: ExamInfo[]): CourseSectionBuilder {
    this.midterms = midterms;
    return this;
  }

  public withFinal(final: ExamInfo): CourseSectionBuilder {
    this.final = final;
    return this;
  }

  public build(): CourseSection {
    return new CourseSection(
      this.section,
      this.lecture,
      this.discussions,
      this.labs,
      this.studio,
      this.midterms,
      this.final,
    );
  }
}

export default CourseSectionBuilder;

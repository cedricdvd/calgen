import ExamInfo from "./exam-info";
import SectionInfo from "./section-info";
import CourseSection from "./course-section";

class CourseSectionBuilder {
    private section: string;
    private lecture: SectionInfo;
    private discussions: Map<string, SectionInfo>;
    private labs: Map<string, SectionInfo>;
    private studio: Map<string, SectionInfo>;
    private midterms: ExamInfo[];
    private final: ExamInfo;

    constructor() {
        this.section = "";
        this.lecture = new SectionInfo("", "", "", "", "");
        this.discussions = new Map<string, SectionInfo>();
        this.labs = new Map<string, SectionInfo>();
        this.studio = new Map<string, SectionInfo>();
        this.midterms = [];
        this.final = new ExamInfo("", "", "", "", "");
    }

    public withSection(section: string): CourseSectionBuilder {
        this.section = section;
        return this;
    }

    public withLecture(lecture: SectionInfo): CourseSectionBuilder {
        this.lecture = lecture;
        return this;
    }

    public withDiscussions(discussions: Map<string, SectionInfo>): CourseSectionBuilder {
        this.discussions = discussions;
        return this;
    }

    public withLabs(labs: Map<string, SectionInfo>): CourseSectionBuilder {
        this.labs = labs;
        return this;
    }

    public withStudio(studio: Map<string, SectionInfo>): CourseSectionBuilder {
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
            this.final
        );
    }
}

export default CourseSectionBuilder;

import ExamInfo from "./exam-info";
import SectionInfo from "./section-info";

class CourseSection {
    private _section: string;
    private _lecture: SectionInfo;
    private _discussions: Map<string, SectionInfo>;
    private _labs: Map<string, SectionInfo>;
    private _studio: Map<string, SectionInfo>;
    private _midterms: ExamInfo[];
    private _final: ExamInfo;

    constructor(
        section: string,
        lecture: SectionInfo,
        discussions: Map<string, SectionInfo>,
        labs: Map<string, SectionInfo>,
        studio: Map<string, SectionInfo>,
        midterms: ExamInfo[],
        final: ExamInfo
    ) {
        this._section = section;
        this._lecture = lecture;
        this._discussions = discussions;
        this._labs = labs;
        this._studio = studio;
        this._midterms = midterms;
        this._final = final;
    }

    public get section(): string {
        return this._section;
    }

    public get lecture(): SectionInfo {
        return this._lecture;
    }

    public getNumberOfLectures(): number {
        return this.lecture === undefined ? 0 : 1;
    }

    public get discussions(): Map<string, SectionInfo> {
        return this._discussions;
    }

    public getDiscussionSections(): string[] {
        return Array.from(this.discussions.keys());
    }

    public getNumberOfDiscussions(): number {
        return this.discussions.size;
    }

    public getDiscussion(section: string): SectionInfo | undefined {
        return this.discussions.get(section);
    }

    public get labs(): Map<string, SectionInfo>{
        return this._labs;
    }

    public getLabSections(): string[] {
        return Array.from(this.labs.keys());
    }

    public getNumberOfLabs(): number {
        return this.labs.size;
    }

    public getLab(section: string): SectionInfo | undefined{
        return this.labs.get(section);
    }

    public get studio(): Map<string, SectionInfo> {
        return this._studio;
    }

    public getStudioSections(): string[] {
        return Array.from(this.studio.keys());
    }

    public getNumberOfStudios(): number {
        return this.studio.size;
    }

    public getStudio(section: string): SectionInfo | undefined{
        return this.studio.get(section);
    }

    public get midterms(): ExamInfo[] {
        return this._midterms;
    }

    public getNumberOfMidterms(): number {
        return this.midterms.length;
    }

    public get final(): ExamInfo {
        return this._final;
    }

    public getNumberOfFinals(): number {
        return this.final === undefined ? 0 : 1;
    }
}

export default CourseSection;

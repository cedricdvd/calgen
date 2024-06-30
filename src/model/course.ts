import CourseSection from './course-section';

class Course {
    private _department: string;
    private _code: string;
    private _sections: Map<string, CourseSection>;

    constructor(department: string, code: string, sections: Map<string, CourseSection>) {
        this._department = department;
        this._code = code;
        this._sections = sections;
    }

    public get department(): string {
        return this._department;
    }

    public get code(): string {
        return this._code;
    }

    public get name(): string {
        return `${this.department} ${this.code}`;
    }

    public get sections(): Map<string, CourseSection> {
        return this._sections;
    }

    public getSectionNumbers(): string[] {
        return Array.from(this.sections.keys());
    }

    public getNumberOfSections(): number {
        return this.sections.size;
    }

    public getSection(section: string): CourseSection | undefined {
        return this.sections.get(section);
    }
}

export default Course;

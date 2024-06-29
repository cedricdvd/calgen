import CourseSection from './course-section';

class Course {
    private _sections: Map<string, CourseSection>;

    constructor(sections: Map<string, CourseSection>) {
        this._sections = sections;
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

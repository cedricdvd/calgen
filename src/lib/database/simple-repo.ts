import ExamInfo from '@/lib/model/exam-info';
import exampleClasses, { ClassDetails, ExamDetails }from '../data/example-data';
import Course from '../model/course';
import CourseSection from '@/lib/model/course-section';
import CourseSectionBuilder from '@/lib/model/course-section-builder';
import SectionInfo from '@/lib/model/section-info';

class SimpleRepo {

    private courses: Map<string, Course>;

    public constructor() {
        this.courses = new Map();
    }

    public addCourse(courseName: string, course: Course): void {
        this.courses.set(courseName, course);
    }

    public getCourse(courseName: string): Course | undefined {
        return this.courses.get(courseName);
    }

    public updateCourse(courseName: string, course: Course): void {
        this.courses.set(courseName, course);
    }

    public deleteCourse(courseName: string): void {
        this.courses.delete(courseName);
    }

    public filterDepartment(department: string): Course[] {
        return Array.from(this.courses.values()).filter(
            course => course.department === department
        );
    }

    public getCourseCount(): number {
        return this.courses.size;
    }

    public fillExampleClasses(): void {
        for (const courseName in exampleClasses) {
            let sections = new Map<string, CourseSection>();

            for (const section in exampleClasses[courseName]) {
                let builder = new CourseSectionBuilder();
                let details = exampleClasses[courseName][section];

                if (details.LE) {
                    let key = Object.keys(details.LE)[0];
                    builder = builder.withLecture(this.createSectionInfo(key, details.LE[key]));
                }

                if (details.LA) {
                    let labMap = new Map<string, SectionInfo>();
                    for (const key in details.LA) {
                        labMap.set(key, this.createSectionInfo(key, details.LA[key]));
                    }

                    builder = builder.withLabs(labMap);
                }

                if (details.DI) {
                    let discussionMap = new Map<string, SectionInfo>();
                    for (const key in details.DI) {
                        discussionMap.set(key, this.createSectionInfo(key, details.DI[key]));
                    }

                    builder = builder.withDiscussions(discussionMap);
                }

                if (details.ST) {
                    let studioMap = new Map<string, SectionInfo>();
                    for (const key in details.ST) {
                        studioMap.set(key, this.createSectionInfo(key, details.ST[key]));
                    }

                    builder = builder.withStudio(studioMap);
                }

                if (details.MI) {
                    let midtermArray = details.MI.map(midterm => this.createExamInfo(midterm));

                    builder = builder.withMidterms(midtermArray);
                }

                if (details.FI) {
                    builder = builder.withFinal(this.createExamInfo(details.FI));
                }

                sections.set(section, builder.build());
            }

            let department = courseName.split(' ')[0];
            let code = courseName.split(' ')[1];
            this.addCourse(courseName, new Course(department, code, sections));
        }
    }

    private createSectionInfo(key: string, details: ClassDetails): SectionInfo {
        return new SectionInfo(
            key,
            details.Days,
            details.Time,
            details.Building || '',
            details.Room || ''
        );
    }

    private createExamInfo(details:ExamDetails): ExamInfo {
        return new ExamInfo(
            details.Date,
            details.Days,
            details.Time,
            details.Building || '',
            details.Room || ''
        );
    }
}

export default SimpleRepo;

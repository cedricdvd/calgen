import CourseSection from "@/model/course-section";
import ExamInfo from "@/model/exam-info";
import SectionInfo from "@/model/section-info";
import exp from "constants";

describe("Section", () => {
    let section: CourseSection;

    beforeEach(() => {
        let lecture = new SectionInfo("A00", "MWF", "10:00-10:50", "GH", "242");

        let discussions = new Map<string, SectionInfo>();
        discussions.set('A01', new SectionInfo("A01", "W", "4:00p-4:50p", "PETER", "108"));
        discussions.set('A02', new SectionInfo("A02", "W", "5:00p-5:50p", "PODEM", "1A20"));

        let labs = new Map<string, SectionInfo>();
        labs.set('A50', new SectionInfo("A50", "Tu", "2:00p-4:50p", "WLH", "2005"));
        labs.set('A51', new SectionInfo("A51", "Th", "2:00p-4:50p", "WLH", "2005"));
        labs.set('A52', new SectionInfo("A52", "F", "2:00p-4:50p", "WLH", "2005"));

        let studio = new Map<string, SectionInfo>();
        studio.set('A60', new SectionInfo("A60", "M", "2:00p-4:50p", "WLH", "2005"));

        let midterms = [
            new ExamInfo("10/24/2024", "Th", "9:00p-9:50p", "PETER", "108"),
            new ExamInfo("11/21/2024", "Th", "9:00p-9:50p", "PETER", "108")
        ];

        let final = new ExamInfo("12/07/2024", "S", "7:00p-9:59p", "WLH", "2005");

        section = new CourseSection("A00", lecture, discussions, labs, studio, midterms, final);
    })

    test("Section number", () => {
        expect(section.section).toBe("A00");
    })

    test("Get lecture", () => {
        expect(section.lecture.section).toBe("A00");
        expect(section.lecture.days).toBe("MWF");
        expect(section.lecture.time).toBe("10:00-10:50");
        expect(section.lecture.building).toBe("GH");
        expect(section.lecture.room).toBe("242");
    })

    test("Get number of lectures", () => {
        expect(section.getNumberOfLectures()).toBe(1);
    })

    test("Get discussions", () => {
        expect(section.discussions.size).toBe(2);
        
        let sectionInfo = section.discussions.get('A01');
        expect(sectionInfo?.section).toBe("A01");
        expect(sectionInfo?.days).toBe("W");
        expect(sectionInfo?.time).toBe("4:00p-4:50p");
        expect(sectionInfo?.building).toBe("PETER");
        expect(sectionInfo?.room).toBe("108");

        sectionInfo = section.discussions.get('A02');
        expect(sectionInfo?.section).toBe("A02");
        expect(sectionInfo?.days).toBe("W");
        expect(sectionInfo?.time).toBe("5:00p-5:50p");
        expect(sectionInfo?.building).toBe("PODEM");
        expect(sectionInfo?.room).toBe("1A20");
    })

    test("Get discussion sections", () => {
        expect(section.getDiscussionSections()).toEqual(["A01", "A02"]);
    })

    test("Get number of discussions", () => {
        expect(section.getNumberOfDiscussions()).toBe(2);
    })

    test("Get discussion", () => {
        let sectionInfo = section.getDiscussion("A01");

        expect(sectionInfo?.section).toBe("A01");
        expect(sectionInfo?.days).toBe("W");
        expect(sectionInfo?.time).toBe("4:00p-4:50p");
        expect(sectionInfo?.building).toBe("PETER");
        expect(sectionInfo?.room).toBe("108");

        sectionInfo = section.getDiscussion("A02");
        expect(sectionInfo?.section).toBe("A02");
        expect(sectionInfo?.days).toBe("W");
        expect(sectionInfo?.time).toBe("5:00p-5:50p");
        expect(sectionInfo?.building).toBe("PODEM");
        expect(sectionInfo?.room).toBe("1A20");

        sectionInfo = section.getDiscussion("A03");
        expect(sectionInfo).toBeUndefined();
    })

    test("Get labs", () => {
        expect(section.labs.size).toBe(3);

        let sectionInfo = section.labs.get('A50');
        expect(sectionInfo?.section).toBe("A50");
        expect(sectionInfo?.days).toBe("Tu");
        expect(sectionInfo?.time).toBe("2:00p-4:50p");
        expect(sectionInfo?.building).toBe("WLH");
        expect(sectionInfo?.room).toBe("2005");

        sectionInfo = section.labs.get('A51');
        expect(sectionInfo?.section).toBe("A51");
        expect(sectionInfo?.days).toBe("Th");
        expect(sectionInfo?.time).toBe("2:00p-4:50p");
        expect(sectionInfo?.building).toBe("WLH");
        expect(sectionInfo?.room).toBe("2005");

        sectionInfo = section.labs.get('A52');
        expect(sectionInfo?.section).toBe("A52");
        expect(sectionInfo?.days).toBe("F");
        expect(sectionInfo?.time).toBe("2:00p-4:50p");
        expect(sectionInfo?.building).toBe("WLH");
        expect(sectionInfo?.room).toBe("2005");
    })

    test("Get lab sections", () => {
        expect(section.getLabSections()).toEqual(["A50", "A51", "A52"]);
    })

    test("Get number of labs", () => {
        expect(section.getNumberOfLabs()).toBe(3);
    })

    test("Get lab", () => {
        let sectionInfo = section.getLab("A50");

        expect(sectionInfo?.section).toBe("A50");
        expect(sectionInfo?.days).toBe("Tu");
        expect(sectionInfo?.time).toBe("2:00p-4:50p");
        expect(sectionInfo?.building).toBe("WLH");
        expect(sectionInfo?.room).toBe("2005");

        sectionInfo = section.getLab("A51");
        expect(sectionInfo?.section).toBe("A51");
        expect(sectionInfo?.days).toBe("Th");
        expect(sectionInfo?.time).toBe("2:00p-4:50p");
        expect(sectionInfo?.building).toBe("WLH");
        expect(sectionInfo?.room).toBe("2005");

        sectionInfo = section.getLab("A52");
        expect(sectionInfo?.section).toBe("A52");
        expect(sectionInfo?.days).toBe("F");
        expect(sectionInfo?.time).toBe("2:00p-4:50p");
        expect(sectionInfo?.building).toBe("WLH");
        expect(sectionInfo?.room).toBe("2005");

        sectionInfo = section.getLab("A53");
        expect(sectionInfo).toBeUndefined();
    });

    test("Get studio", () => {
        expect(section.studio.size).toBe(1);

        let sectionInfo = section.studio.get('A60');
        expect(sectionInfo?.section).toBe("A60");
        expect(sectionInfo?.days).toBe("M");
        expect(sectionInfo?.time).toBe("2:00p-4:50p");
        expect(sectionInfo?.building).toBe("WLH");
        expect(sectionInfo?.room).toBe("2005");
    })

    test("Get studio sections", () => {
        expect(section.getStudioSections()).toEqual(["A60"]);
    })

    test("Get number of studios", () => {
        expect(section.getNumberOfStudios()).toBe(1);
    })

    test("Get studio section", () => {
        let sectionInfo = section.getStudio("A60");

        expect(sectionInfo?.section).toBe("A60");
        expect(sectionInfo?.days).toBe("M");
        expect(sectionInfo?.time).toBe("2:00p-4:50p");
        expect(sectionInfo?.building).toBe("WLH");
        expect(sectionInfo?.room).toBe("2005");

        sectionInfo = section.getStudio("A61");
        expect(sectionInfo).toBeUndefined();
    
    })

    test("Get midterm exams", () => {
        expect(section.midterms.length).toBe(2);

        let examInfo = section.midterms[0];
        expect(examInfo.date).toBe("10/24/2024");
        expect(examInfo.days).toBe("Th");
        expect(examInfo.time).toBe("9:00p-9:50p");
        expect(examInfo.building).toBe("PETER");
        expect(examInfo.room).toBe("108");

        examInfo = section.midterms[1];
        expect(examInfo.date).toBe("11/21/2024");
        expect(examInfo.days).toBe("Th");
        expect(examInfo.time).toBe("9:00p-9:50p");
        expect(examInfo.building).toBe("PETER");
        expect(examInfo.room).toBe("108");
    })

    test("Get number of midterm exams", () => {
        expect(section.getNumberOfMidterms()).toBe(2);
    })

    test("Get final exam", () => {
        expect(section.final.date).toBe("12/07/2024");
        expect(section.final.days).toBe("S");
        expect(section.final.time).toBe("7:00p-9:59p");
        expect(section.final.building).toBe("WLH");
        expect(section.final.room).toBe("2005");
    })

    test("Get number of final exams", () => {
        expect(section.getNumberOfFinals()).toBe(1);
    })
})

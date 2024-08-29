from models import Activity, Course, Department, Exam, Section


class SimpleRepo:
    def __init__(self):
        self._departments: dict[int, Department] = dict()
        self._courses: dict[int, Course] = dict()
        self._sections: dict[int, Section] = dict()
        self._activities: dict[int, Activity] = dict()
        self._exams: dict[int, Exam] = dict()

        self._next_department_id = 0
        self._next_course_id = 0
        self._next_section_id = 0
        self._next_activity_id = 0
        self._next_exam_id = 0

    def add_department(self, department: Department) -> bool:
        self._departments[self._next_department_id] = department.with_id(
            self._next_department_id
        )
        self._next_department_id += 1
        return True

    def add_departments(self, departments: list[Department]):
        for department in departments:
            self.add_department(department)

    def add_course(self, course: Course) -> bool:
        self._courses[self._next_course_id] = course.with_id(self._next_course_id)
        self._next_course_id += 1
        return True

    def add_courses(self, courses: list[Course]):
        for course in courses:
            self.add_course(course)

    def add_section(self, section: Section) -> bool:
        self._sections[self._next_section_id] = section.with_id(self._next_section_id)
        self._next_section_id += 1
        return True

    def add_sections(self, sections: list[Section]):
        for section in sections:
            self.add_section(section)

    def add_activity(self, activity: Activity) -> bool:
        self._activities[self._next_activity_id] = activity.with_id(
            self._next_activity_id
        )
        self._next_activity_id += 1
        return True

    def add_activities(self, activities: list[Activity]):
        for activity in activities:
            self.add_activity(activity)

    def add_exam(self, exam: Exam) -> bool:
        self._exams[self._next_exam_id] = exam.with_id(self._next_exam_id)
        self._next_exam_id += 1
        return True

    def add_exams(self, exams: list[Exam]):
        for exam in exams:
            self.add_exam(exam)

    def get_department(self, id: int) -> Department:
        if id in self._departments:
            return self._departments[id]

        return None

    def get_departments(self) -> list[Department]:
        return list(self._departments.values())

    def get_department_by_code(self, code: str) -> Department:
        for department in self._departments.values():
            if department.get_code() == code:
                return department

        return None

    def get_course(self, id: int) -> Course:
        if id in self._courses:
            return self._courses[id]

        return None

    def get_courses(self) -> list[Course]:
        return list(self._courses.values())

    def get_courses_by_department(self, department_id: int) -> list[Course]:
        return [
            course
            for course in self._courses.values()
            if course.get_department_id() == department_id
        ]

    def get_section(self, id: int) -> Section:
        if id in self._sections:
            return self._sections[id]

        return None

    def get_sections(self) -> list[Section]:
        return list(self._sections.values())

    def get_sections_by_course(self, course_id: int) -> list[Section]:
        return [
            section
            for section in self._sections.values()
            if section.get_course_id() == course_id
        ]

    def get_activity(self, id: int) -> Activity:
        if id in self._activities:
            return self._activities[id]

        return None

    def get_activities(self) -> list[Activity]:
        return list(self._activities.values())

    def get_activities_by_section(self, section_id: int) -> list[Activity]:
        return [
            activity
            for activity in self._activities.values()
            if activity.get_section_id() == section_id
        ]

    def get_exam(self, id: int) -> Exam:
        if id in self._exams:
            return self._exams[id]

        return None

    def get_exams(self) -> list[Exam]:
        return list(self._exams.values())

    def get_exams_by_section(self, section_id: int) -> list[Exam]:
        return [
            exam for exam in self._exams.values() if exam.get_section_id() == section_id
        ]

    def update_department(self, id: int, department: Department) -> bool:
        if id not in self._departments:
            return False

        self._departments[id] = department.with_id(id)
        return True

    def update_course(self, id: int, course: Course) -> bool:
        if id not in self._courses:
            return False

        self._courses[id] = course.with_id(id)
        return True

    def update_section(self, id: int, section: Section) -> bool:
        if id not in self._sections:
            return False

        self._sections[id] = section.with_id(id)
        return True

    def update_activity(self, id: int, activity: Activity) -> bool:
        if id not in self._activities:
            return False

        self._activities[id] = activity.with_id(id)
        return True

    def update_exam(self, id: int, exam: Exam) -> bool:
        if id not in self._exams:
            return False

        self._exams[id] = exam.with_id(id)
        return True

    def delete_department(self, id: int) -> bool:
        if id not in self._departments:
            return False

        self._departments.pop(id)
        return True

    def delete_course(self, id: int) -> bool:
        if id not in self._courses:
            return False

        self._courses.pop(id)
        return True

    def delete_section(self, id: int) -> bool:
        if id not in self._sections:
            return False

        self._sections.pop(id)
        return True

    def delete_activity(self, id: int) -> bool:
        if id not in self._activities:
            return False

        self._activities.pop(id)
        return True

    def delete_exam(self, id: int) -> bool:
        if id not in self._exams:
            return False

        self._exams.pop(id)
        return True

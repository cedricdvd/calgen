from abc import ABC, abstractmethod

from models import Activity, Course, Department, Exam, Section
from repository import SimpleRepo


class IProcessor(ABC):

    @abstractmethod
    def process_and_store(self, data: str):
        """Processes and stores data into a repository"""
        pass

    @abstractmethod
    def transform(self, data: str):
        """Transforms data into a model"""
        pass


class DepartmentProcessor(IProcessor):

    def __init__(self, repo: SimpleRepo):
        self._repo = repo

    def process_and_store(self, data: str):
        department = self.transform(data)
        self._repo.add_department(department)

    def transform(self, data: str) -> Department:
        code, title = data.split(";")
        return Department(code, title)


class CourseProcessor(IProcessor):

    def __init__(self, repo: SimpleRepo, dept: Department):
        self._repo = repo
        self._dept = dept

    def process_and_store(self, data: str):
        """Transforms and stores Course into repository

        Args:
            data (str): Course input data, of the form:
                "Number;Title;Units"
        """
        course = self.transform(data)
        self._repo.add_course(course)

    def transform(self, data: str) -> Course:
        """Transforms data into Course Model

        Args:
            data (str): Course input data, of the form:
                "Number;Title;Units"

        Returns:
            Course: Course model
        """
        dept_id = self._dept.get_id()
        number, title, units = data.split(";")
        return Course(dept_id, number, title, int(units))

    def update_department(self, dept: Department):
        self._dept = dept


class SectionProcessor(IProcessor):

    def __init__(self, repo: SimpleRepo, course: Course):
        self._repo = repo
        self._course = course

    def process_and_store(self, data: str):
        """Transforms and stores Section into repository

        Args:
            data (str): Section input data, of the form:
                "Number"
        """
        section = self.transform(data)
        self._repo.add_section(section)

    def transform(self, data: str) -> Section:
        """Transforms data into Section Model

        Args:
            data (str) : Section input data, of the form:
                "Number"

        Returns:
            Section: Section model
        """
        course_id = self._course.get_id()
        number = data
        return Section(course_id, number)

    def update_course(self, course: Course):
        self._course = course


class ActivityProcessor(IProcessor):

    def __init__(self, repo: SimpleRepo, section: Section):
        self._repo = repo
        self._section = section

    def process_and_store(self, data: str):
        """Transforms and stores Activity into repository

        Args:
            data (str): Activity input data, of the form:
                "Type;SectionNum;Days;Time;Building;Room;Instructor"
        """
        activity = self.transform(data)
        self._repo.add_activity(activity)

    def transform(self, data: str) -> Activity:
        """Transforms data into Activity Model

        Args:
            data (str): Activity input data, of the form:
                "Type;SectionNum;Days;Time;Building;Room;Instructor"

        Returns:
            Activity: Activity model
        """
        section_id = self._section.get_id()
        meeting_type, section_num, days, time, building, room, instructor = data.split(
            ";"
        )
        return Activity(
            section_id,
            meeting_type,
            section_num,
            days,
            time,
            building,
            room,
            instructor,
        )

    def update_section(self, section: Section):
        self._section = section


class ExamProcessor(IProcessor):

    def __init__(self, repo: SimpleRepo, section: Section):
        self._repo = repo
        self._section = section

    def process_and_store(self, data: str):
        """Transforms and stores Exam into repository

        Args:
            data (str): Exam input data, of the form:
                "Type;Date;DayOfWeek;Time;Building;Room"
        """
        exam = self.transform(data)
        self._repo.add_exam(exam)

    def transform(self, data: str) -> Exam:
        """Transforms data into Exam Model

        Args:
            data (str): Exam input data, of the form:
                "Type;Date;DayOfWeek;Time;Building;Room"

        Returns:
            Exam: Exam Model
        """
        section_id = self._section.get_id()
        exam_type, date, day_of_week, time, building, room = data.split(";")
        return Exam(
            section_id,
            exam_type,
            date,
            day_of_week,
            time,
            building,
            room,
        )

    def update_section(self, section: Section):
        self._section = section

from collections import defaultdict

import pytest

from models import Activity, Course, Department, Exam, Section
from repository import SimpleRepo


@pytest.fixture
def generate_departments() -> list[tuple[Department, int, int]]:
    return [
        (Department("CSE", "Computer Science and Engineering"), 0, 1),
        (Department("MATH", "Mathematics"), 1, 2),
        (Department("COGS", "Cognitive Science", 5), 2, 3),
        (Department("PHYS", "Physics", 3), 3, 4),
        (Department("BENG", "Bioengineering"), 4, 5),
    ]


@pytest.fixture
def generate_courses() -> list[tuple[Course, int, int]]:
    return [
        (Course(1, "110", "Software Engineering", 4), 0, 1),
        (Course(2, "120", "Math Course", 4), 1, 2),
        (Course(1, "130", "Computer Lab", 2, 5), 2, 3),
        (Course(6, "140", "Physics Lab", 2, 3), 3, 4),
        (Course(7, "150", "Bioengineering Lab", 3), 4, 5),
    ]


@pytest.fixture
def generate_sections() -> list[tuple[Section, int, int]]:
    return [
        (Section(1, "A00"), 0, 1),
        (Section(1, "B00"), 1, 2),
        (Section(2, "A00", 5), 2, 3),
        (Section(6, "B00", 3), 3, 4),
        (Section(7, "A00"), 4, 5),
    ]


@pytest.fixture
def generate_activities() -> list[tuple[Activity, int, int]]:
    return [
        (Activity(1, "LE", "A00", "MWF", "7:00a-8:00a", "BLD", "1", "TBA"), 0, 1),
        (Activity(1, "DI", "A01", "Tu", "7:00a-8:00a", "BLD", "2", "TBA"), 1, 2),
        (
            Activity(2, "LA", "B00", "MW", "7:00p-10:00p", "FAH", "3001", "Staff", 5),
            2,
            3,
        ),
        (Activity(6, "LA", "B01", "S", "3:00p-6:00p", "WLH", "2001", "Staff", 3), 3, 4),
        (
            Activity(7, "ST", "C00", "ThF", "7:00p-9:00p", "BLD", "3", "Instructor"),
            4,
            5,
        ),
    ]


@pytest.fixture
def generate_exams() -> list[tuple[Exam, int, int]]:
    return [
        (Exam(1, "MI", "W", "12/06/2004", "7:00a-10:00a", "TBA", "TBA"), 0, 1),
        (Exam(1, "FI", "M", "01/04/2005", "7:00a-10:00a", "TBA", "TBA"), 1, 2),
        (Exam(2, "FI", "W", "12/5/2004", "10:00a-1:00p", "TBA", "TBA", 5), 2, 3),
        (Exam(2, "FI", "F", "12/9/2004", "10:00a-1:00p", "TBA", "TBA", 3), 3, 4),
        (Exam(3, "OT", "S", "11/09/2004", "11:30p-1:00a", "TBA", "TBA"), 4, 5),
    ]


def test_add_department(generate_departments):
    repo = SimpleRepo()

    for department, expected_id, expected_next_id in generate_departments:
        assert repo.add_department(department) == department.with_id(expected_id)
        assert repo._departments[expected_id] == department.with_id(expected_id)
        assert repo._departments[expected_id].get_id() == expected_id
        assert repo._next_department_id == expected_next_id

    assert len(repo._departments) == len(generate_departments)


def test_add_departments(generate_departments):
    repo = SimpleRepo()

    departments = [department for department, _, _ in generate_departments]
    repo.add_departments(departments)

    for department, expected_id, _ in generate_departments:
        assert repo._departments[expected_id] == department.with_id(expected_id)
        assert repo._departments[expected_id].get_id() == expected_id

    assert repo._next_department_id == len(generate_departments)


def test_add_course(generate_courses):
    repo = SimpleRepo()

    for course, expected_id, expected_next_id in generate_courses:
        assert repo.add_course(course) == course.with_id(expected_id)
        assert repo._courses[expected_id] == course.with_id(expected_id)
        assert repo._courses[expected_id].get_id() == expected_id
        assert repo._next_course_id == expected_next_id

    assert len(repo._courses) == len(generate_courses)


def test_add_courses(generate_courses):
    repo = SimpleRepo()

    courses = [course for course, _, _ in generate_courses]
    repo.add_courses(courses)

    for course, expected_id, _ in generate_courses:
        assert repo._courses[expected_id] == course.with_id(expected_id)
        assert repo._courses[expected_id].get_id() == expected_id

    assert repo._next_course_id == len(generate_courses)


def test_add_section(generate_sections):
    repo = SimpleRepo()

    for section, expected_id, expected_next_id in generate_sections:
        assert repo.add_section(section) == section.with_id(expected_id)
        assert repo._sections[expected_id] == section.with_id(expected_id)
        assert repo._sections[expected_id].get_id() == expected_id
        assert repo._next_section_id == expected_next_id

    assert len(repo._sections) == len(generate_sections)


def test_add_sections(generate_sections):
    repo = SimpleRepo()

    sections = [section for section, _, _ in generate_sections]
    repo.add_sections(sections)

    for section, expected_id, _ in generate_sections:
        assert repo._sections[expected_id] == section.with_id(expected_id)
        assert repo._sections[expected_id].get_id() == expected_id

    assert repo._next_section_id == len(generate_sections)


def test_add_activity(generate_activities):
    repo = SimpleRepo()

    for activity, expected_id, expected_next_id in generate_activities:
        assert repo.add_activity(activity) == activity.with_id(expected_id)
        assert repo._activities[expected_id] == activity.with_id(expected_id)
        assert repo._activities[expected_id].get_id() == expected_id
        assert repo._next_activity_id == expected_next_id

    assert len(repo._activities) == len(generate_activities)


def test_add_activities(generate_activities):
    repo = SimpleRepo()

    activities = [activity for activity, _, _ in generate_activities]
    repo.add_activities(activities)

    for activity, expected_id, _ in generate_activities:
        assert repo._activities[expected_id] == activity.with_id(expected_id)
        assert repo._activities[expected_id].get_id() == expected_id

    assert repo._next_activity_id == len(generate_activities)


def test_add_exam(generate_exams):
    repo = SimpleRepo()

    for exam, expected_id, expected_next_id in generate_exams:
        assert repo.add_exam(exam) == exam.with_id(expected_id)
        assert repo._exams[expected_id] == exam.with_id(expected_id)
        assert repo._exams[expected_id].get_id() == expected_id
        assert repo._next_exam_id == expected_next_id

    assert len(repo._exams) == len(generate_exams)


def test_add_exams(generate_exams):
    repo = SimpleRepo()

    exams = [exam for exam, _, _ in generate_exams]
    repo.add_exams(exams)

    for exam, expected_id, _ in generate_exams:
        assert repo._exams[expected_id] == exam.with_id(expected_id)
        assert repo._exams[expected_id].get_id() == expected_id

    assert repo._next_exam_id == len(generate_exams)


def test_get_department(generate_departments):

    repo = SimpleRepo()
    repo.add_departments([department for department, _, _ in generate_departments])

    for department, expected_id, _ in generate_departments:
        assert repo.get_department(expected_id) == department.with_id(expected_id)

    assert repo.get_department(10) is None


def test_get_departments(generate_departments):

    repo = SimpleRepo()
    repo.add_departments([department for department, _, _ in generate_departments])

    departments = [department for department, _, _ in generate_departments]
    assert repo.get_departments() == departments


def test_get_departments_by_code(generate_departments):

    repo = SimpleRepo()
    repo.add_departments([department for department, _, _ in generate_departments])

    for department, _, _ in generate_departments:
        assert repo.get_department_by_code(department.get_code()) == department

    assert repo.get_department_by_code("NONE") is None


def test_get_course(generate_courses):

    repo = SimpleRepo()
    repo.add_courses([course for course, _, _ in generate_courses])

    for course, expected_id, _ in generate_courses:
        assert repo.get_course(expected_id) == course

    assert repo.get_course(10) is None


def test_get_courses(generate_courses):

    repo = SimpleRepo()
    repo.add_courses([course for course, _, _ in generate_courses])

    courses = [course for course, _, _ in generate_courses]
    assert repo.get_courses() == courses


def test_get_courses_by_department(generate_courses):

    repo = SimpleRepo()
    repo.add_courses([course for course, _, _ in generate_courses])

    code_to_courses = defaultdict(list)

    for course, _, _ in generate_courses:
        code_to_courses[course.get_department_id()].append(course)

    for department_id in code_to_courses:
        assert (
            repo.get_courses_by_department(department_id)
            == code_to_courses[department_id]
        )


def test_get_section(generate_sections):

    repo = SimpleRepo()
    repo.add_sections([section for section, _, _ in generate_sections])

    for section, expected_id, _ in generate_sections:
        assert repo.get_section(expected_id) == section

    assert repo.get_section(10) is None


def test_get_sections(generate_sections):

    repo = SimpleRepo()
    repo.add_sections([section for section, _, _ in generate_sections])

    sections = [section for section, _, _ in generate_sections]
    assert repo.get_sections() == sections


def test_get_sections_by_course(generate_sections):

    repo = SimpleRepo()
    repo.add_sections([section for section, _, _ in generate_sections])

    course_to_sections = defaultdict(list)

    for section, _, _ in generate_sections:
        course_to_sections[section.get_course_id()].append(section)

    for course_id in course_to_sections:
        assert repo.get_sections_by_course(course_id) == course_to_sections[course_id]


def test_get_activity(generate_activities):

    repo = SimpleRepo()
    repo.add_activities([activity for activity, _, _ in generate_activities])

    for activity, expected_id, _ in generate_activities:
        assert repo.get_activity(expected_id) == activity

    assert repo.get_activity(10) is None


def test_get_activities(generate_activities):

    repo = SimpleRepo()
    repo.add_activities([activity for activity, _, _ in generate_activities])

    activities = [activity for activity, _, _ in generate_activities]
    assert repo.get_activities() == activities


def test_get_activities_by_section(generate_activities):

    repo = SimpleRepo()
    repo.add_activities([activity for activity, _, _ in generate_activities])

    section_to_activities = defaultdict(list)

    for activity, _, _ in generate_activities:
        section_to_activities[activity.get_section_id()].append(activity)

    for section_id in section_to_activities:
        assert (
            repo.get_activities_by_section(section_id)
            == section_to_activities[section_id]
        )


def test_get_exam(generate_exams):

    repo = SimpleRepo()
    repo.add_exams([exam for exam, _, _ in generate_exams])

    for exam, expected_id, _ in generate_exams:
        assert repo.get_exam(expected_id) == exam

    assert repo.get_exam(10) is None


def test_get_exams(generate_exams):

    repo = SimpleRepo()
    repo.add_exams([exam for exam, _, _ in generate_exams])

    exams = [exam for exam, _, _ in generate_exams]
    assert repo.get_exams() == exams


def test_get_exams_by_section(generate_exams):

    repo = SimpleRepo()
    repo.add_exams([exam for exam, _, _ in generate_exams])

    section_to_exams = defaultdict(list)

    for exam, _, _ in generate_exams:
        section_to_exams[exam.get_section_id()].append(exam)

    for section_id in section_to_exams:
        assert repo.get_exams_by_section(section_id) == section_to_exams[section_id]


def test_update_department(generate_departments):

    repo = SimpleRepo()
    repo.add_departments([department for department, _, _ in generate_departments])

    # Update department at id 1
    assert repo.update_department(1, Department("WCWP", "Warren Writing", 3))
    assert repo.get_department(1).get_title() == "Warren Writing"
    assert repo.get_department(1).get_code() == "WCWP"

    # Department at id 10 does not exist
    assert not repo.update_department(10, Department("WCWP", "Warren Writing", 3))


def test_update_course(generate_courses):

    repo = SimpleRepo()
    repo.add_courses([course for course, _, _ in generate_courses])

    # Update course at id 1
    assert repo.update_course(1, Course(1, 110, "Software Engineering", 1))
    assert repo.get_course(1).get_title() == "Software Engineering"
    assert repo.get_course(1).get_num() == 110
    assert repo.get_course(1).get_units() == 1

    # Course at id 10 does not exist
    assert not repo.update_course(10, Course(1, 110, "Software Engineering", 1))


def test_update_section(generate_sections):

    repo = SimpleRepo()
    repo.add_sections([section for section, _, _ in generate_sections])

    # Update section at id 1
    assert repo.update_section(1, Section(1, "A00"))
    assert repo.get_section(1).get_num() == "A00"

    # Section at id 10 does not exist
    assert not repo.update_section(10, Section(1, "A00"))


def test_update_activity(generate_activities):

    repo = SimpleRepo()
    repo.add_activities([activity for activity, _, _ in generate_activities])

    # Update activity at id 1
    assert repo.update_activity(
        1, Activity(1, "LE", "A00", "MWF", "7:00a-8:00a", "BLD", "1", "TBA")
    )
    assert repo.get_activity(1).get_days_of_week() == "MWF"

    # Activity at id 10 does not exist
    assert not repo.update_activity(
        10, Activity(1, "LE", "A00", "MWF", "7:00a-8:00a", "BLD", "1", "TBA")
    )


def test_update_exam(generate_exams):

    repo = SimpleRepo()
    repo.add_exams([exam for exam, _, _ in generate_exams])

    # Update exam at id 1
    assert repo.update_exam(
        1, Exam(1, "MI", "W", "12/06/2004", "7:00a-10:00a", "TBA", "TBA")
    )
    assert repo.get_exam(1).get_days_of_week() == "W"

    # Exam at id 10 does not exist
    assert not repo.update_exam(
        10, Exam(1, "MI", "W", "12/06/2004", "7:00a-10:00a", "TBA", "TBA")
    )


def test_delete_department(generate_departments):

    repo = SimpleRepo()
    repo.add_departments([department for department, _, _ in generate_departments])

    # Delete department at id 1
    assert repo.delete_department(1)
    assert repo.get_department(1) is None

    # Department at id 10 does not exist
    assert not repo.delete_department(10)


def test_delete_course(generate_courses):

    repo = SimpleRepo()
    repo.add_courses([course for course, _, _ in generate_courses])

    # Delete course at id 1
    assert repo.delete_course(1)
    assert repo.get_course(1) is None

    # Course at id 10 does not exist
    assert not repo.delete_course(10)


def test_delete_section(generate_sections):

    repo = SimpleRepo()
    repo.add_sections([section for section, _, _ in generate_sections])

    # Delete section at id 1
    assert repo.delete_section(1)
    assert repo.get_section(1) is None

    # Section at id 10 does not exist
    assert not repo.delete_section(10)


def test_delete_activity(generate_activities):

    repo = SimpleRepo()
    repo.add_activities([activity for activity, _, _ in generate_activities])

    # Delete activity at id 1
    assert repo.delete_activity(1)
    assert repo.get_activity(1) is None

    # Activity at id 10 does not exist
    assert not repo.delete_activity(10)


def test_delete_exam(generate_exams):

    repo = SimpleRepo()
    repo.add_exams([exam for exam, _, _ in generate_exams])

    # Delete exam at id 1
    assert repo.delete_exam(1)
    assert repo.get_exam(1) is None

    # Exam at id 10 does not exist
    assert not repo.delete_exam(10)

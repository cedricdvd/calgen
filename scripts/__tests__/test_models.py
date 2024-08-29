import pytest

from models import Activity, Course, Department, Exam, Section


@pytest.mark.parametrize(
    "param1, param2, expected",
    [
        (
            (1, "LE", "A00", "MWF", "7:00p-7:50p", "APM", "B402A", "Ioana, Adrian"),
            (1, "LE", "A00", "MWF", "7:00p-7:50p", "APM", "B402A", "Ioana, Adrian"),
            True,
        ),
        (
            (1, "LE", "A00", "MWF", "7:00p-7:50p", "APM", "B402A", "Ioana, Adrian"),
            (1, "LE", "A00", "MWF", "7:00p-7:50p", "APM", "B402A", "Ioana, Adrian", 1),
            True,
        ),
    ],
)
def test_activity_eq(param1, param2, expected):
    """Check that two activities are equal if they have the same attributes"""
    assert (Activity(*param1) == Activity(*param2)) == expected


def test_activity_with_id():
    activity = Activity(
        1, "LE", "A00", "MWF", "7:00p-7:50p", "APM", "B402A", "Ioana, Adrian"
    )

    new_activity = activity.with_id(2)
    assert new_activity.get_id() == 2
    assert new_activity == activity
    assert new_activity is not activity


@pytest.mark.parametrize(
    "param1, param2, expected",
    [
        ((1, 11, "Example Course", 4), (1, 11, "Example Course", 4), True),
        ((1, 11, "Example Course", 4), (1, 11, "Example Course", 4, 5), True),
    ],
)
def test_course_eq(param1, param2, expected):
    """Check that two courses are equal if they have the same attributes"""
    assert (Course(*param1) == Course(*param2)) == expected


def test_course_with_id():
    course = Course(1, 11, "Example Course", 4)

    new_course = course.with_id(2)
    assert new_course.get_id() == 2
    assert new_course == course
    assert new_course is not course


@pytest.mark.parametrize(
    "param1, param2, expected",
    [
        (("DE", "Department of Example"), ("DE", "Department of Example"), True),
        (("DE", "Department of Example"), ("DE", "Department of Example", 1), True),
    ],
)
def test_department_eq(param1, param2, expected):
    """Check that two departments are equal if they have the same attributes"""
    assert (Department(*param1) == Department(*param2)) == expected


def test_department_with_id():
    department = Department("DE", "Department of Example")

    new_department = department.with_id(2)
    assert new_department.get_id() == 2
    assert new_department == department
    assert new_department is not department


@pytest.mark.parametrize(
    "param1, param2, expected",
    [
        (
            (1, "FI", "W", "12/09/2004", "7:00p-9:00p", "APM", "B402A"),
            (1, "FI", "W", "12/09/2004", "7:00p-9:00p", "APM", "B402A"),
            True,
        ),
        (
            (1, "FI", "W", "12/09/2004", "7:00p-9:00p", "APM", "B402A"),
            (1, "FI", "W", "12/09/2004", "7:00p-9:00p", "APM", "B402A", 1),
            True,
        ),
    ],
)
def test_exam_eq(param1, param2, expected):
    """Check that two exams are equal if they have the same attributes"""
    assert (Exam(*param1) == Exam(*param2)) == expected


def test_exam_with_id():
    exam = Exam(1, "FI", "W", "12/09/2004", "7:00p-9:00p", "APM", "B402A")

    new_exam = exam.with_id(2)
    assert new_exam.get_id() == 2
    assert new_exam == exam
    assert new_exam is not exam


@pytest.mark.parametrize(
    "param1, param2, expected",
    [
        ((1, "A00"), (1, "A00"), True),
        ((1, "A00"), (1, "A00", 2), True),
    ],
)
def test_section_eq(param1, param2, expected):
    """Check that two sections are equal if they have the same attributes"""
    assert (Section(*param1) == Section(*param2)) == expected


def test_section_with_id():
    section = Section(1, "A00")

    new_section = section.with_id(2)
    assert new_section.get_id() == 2
    assert new_section == section
    assert new_section is not section

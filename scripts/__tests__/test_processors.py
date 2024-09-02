import pytest

from constants import BILD_ROWS, CAT_ROWS, CSE_ROWS, MATH_ROWS
from models import Activity, Course, Department, Exam, Section
from processor import (
    ActivityProcessor,
    CourseProcessor,
    DepartmentProcessor,
    ExamProcessor,
    SectionProcessor,
)
from repository import SimpleRepo

EXAM_CODES = ["MI", "FI"]


@pytest.fixture
def generate_departments() -> list[str]:
    return [
        "CSE;Computer Science and Engineering",
        "MATH;Mathematics",
        "PHYS;Physics",
        "CHEM;Chemistry",
        "BENG;Bioengineering",
        "COGS;Cognitive Science",
    ]


@pytest.fixture
def setup_dept() -> tuple[SimpleRepo, DepartmentProcessor]:
    repo = SimpleRepo()
    proc = DepartmentProcessor(repo)
    return repo, proc


@pytest.fixture
def setup_course(request) -> tuple[SimpleRepo, CourseProcessor]:
    repo = SimpleRepo()
    proc = CourseProcessor(repo, request.param)
    return repo, proc


@pytest.fixture
def setup_section() -> tuple[SimpleRepo, SectionProcessor]:
    repo = SimpleRepo()
    proc = SectionProcessor(repo, Course(-1, "", "", -1))
    return repo, proc


@pytest.fixture
def setup_activity() -> tuple[SimpleRepo, ActivityProcessor]:
    repo = SimpleRepo()
    proc = ActivityProcessor(repo, Section(-1, ""))
    return repo, proc


@pytest.fixture
def setup_exam() -> tuple[SimpleRepo, ExamProcessor]:
    repo = SimpleRepo()
    proc = ExamProcessor(repo, Section(-1, ""))
    return repo, proc


def test_department_transformer(generate_departments, setup_dept):
    """Test Department Transformer on select departments"""
    _, proc = setup_dept

    for entry in generate_departments:
        assert proc.transform(entry) == Department(*entry.split(";"))


def test_department_processor(generate_departments, setup_dept):
    """Test Department Processor on select departments"""
    repo, proc = setup_dept

    entries = []
    next_id = 0

    for entry in generate_departments:
        proc.process_and_store(entry)

        expected = Department(*entry.split(";"), next_id)
        assert repo.get_department(next_id) == expected
        entries.append(expected)
        next_id += 1

    assert repo.get_departments() == entries
    assert repo._next_department_id == next_id


@pytest.mark.parametrize(
    "setup_course,rows",
    [
        (Department("BILD", "Biology/Lower Division", 1), BILD_ROWS),
        (Department("CAT", "Culture, Art & Technology", 1), CAT_ROWS),
        (Department("CSE", "Computer Science and Engineering", 1), CSE_ROWS),
        (Department("MATH", "Mathematics", 1), MATH_ROWS),
    ],
    indirect=["setup_course"],
)
def test_course_transformer(setup_course, rows):
    """Test Course Transformer on select courses"""
    _, proc = setup_course

    for row in rows:
        items = row.split(";")[1:4]
        input = ";".join(items)
        assert proc.transform(input) == Course(1, items[0], items[1], int(items[2]))


@pytest.mark.parametrize(
    "setup_course,rows",
    [
        (Department("BILD", "Biology/Lower Division", 1), BILD_ROWS),
        (Department("CAT", "Culture, Art & Technology", 1), CAT_ROWS),
        (Department("CSE", "Computer Science and Engineering", 1), CSE_ROWS),
        (Department("MATH", "Mathematics", 1), MATH_ROWS),
    ],
    indirect=["setup_course"],
)
def test_course_processor(setup_course, rows):
    """Test Course Processor on select courses"""
    repo, proc = setup_course

    entries = []
    next_id = 0

    for row in rows:
        items = row.split(";")[1:4]
        input = ";".join(items)
        proc.process_and_store(input)

        expected = Course(1, items[0], items[1], int(items[2]), next_id)

        assert repo.get_course(next_id) == expected
        entries.append(expected)
        next_id += 1

    assert repo.get_courses() == entries


@pytest.mark.parametrize("rows", [BILD_ROWS, CAT_ROWS, CSE_ROWS, MATH_ROWS])
def test_section_transformer(rows, setup_section):
    """Test Section Transformer on select sections"""
    _, proc = setup_section

    course = None
    next_course_id = 0

    for row in rows:
        items = row.split(";")[:5]
        new_course = Course(1, items[1], items[2], int(items[3]), next_course_id)

        if course != new_course:
            course = new_course
            next_course_id += 1
            proc.update_course(course)

        input = items[3]
        assert proc.transform(input) == Section(course.get_id(), items[3])


@pytest.mark.parametrize("rows", [BILD_ROWS, CAT_ROWS, CSE_ROWS, MATH_ROWS])
def test_section_processor(setup_section, rows):
    """Test Section Processor on select sections"""
    repo, proc = setup_section

    entries = []

    course = None
    next_course_id = 0
    next_section_id = 0

    for row in rows:
        items = row.split(";")[:5]
        new_course = Course(1, items[1], items[2], int(items[3]), next_course_id)

        if course != new_course:
            course = new_course
            next_course_id += 1
            proc.update_course(course)

        input = items[3]
        proc.process_and_store(input)

        expected = Section(course.get_id(), items[3], next_section_id)

        assert repo.get_section(next_section_id) == expected
        entries.append(expected)
        next_section_id += 1

    assert repo.get_sections() == entries


@pytest.mark.parametrize("rows", [BILD_ROWS, CAT_ROWS, CSE_ROWS, MATH_ROWS])
def test_activity_transformer(setup_activity, rows):
    """Test Activity Transformer on select activities"""
    _, proc = setup_activity

    section = None
    next_section_id = 0

    for row in rows:
        items = row.split(";")[4:]

        if items[1] in EXAM_CODES:
            continue

        new_section = Section(1, items[0], next_section_id)
        if section != new_section:
            section = new_section
            next_section_id += 1
            proc.update_section(section)

        input = ";".join(items[1:])
        assert proc.transform(input) == Activity(section.get_id(), *items[1:])


@pytest.mark.parametrize("rows", [BILD_ROWS, CAT_ROWS, CSE_ROWS, MATH_ROWS])
def test_activity_processor(setup_activity, rows):
    """Test Activity Processor on select activities"""
    repo, proc = setup_activity

    entries = []

    section = None
    next_section_id = 0
    next_activity_id = 0

    for row in rows:
        items = row.split(";")[4:]

        if items[1] in EXAM_CODES:
            continue

        new_section = Section(1, items[0], next_section_id)
        if section != new_section:
            section = new_section
            next_section_id += 1
            proc.update_section(section)

        input = ";".join(items[1:])
        proc.process_and_store(input)

        expected = Activity(section.get_id(), *items[1:], next_activity_id)

        assert repo.get_activity(next_activity_id) == expected
        entries.append(expected)
        next_activity_id += 1

    assert repo.get_activities() == entries


@pytest.mark.parametrize("rows", [BILD_ROWS, CAT_ROWS, CSE_ROWS, MATH_ROWS])
def test_exam_transformer(setup_exam, rows):
    """Test Exam Transformer on select exams"""
    _, proc = setup_exam

    section = None
    next_section_id = 0

    for row in rows:
        items = row.split(";")[4:]

        if items[1] not in EXAM_CODES:
            continue

        new_section = Section(1, items[0], next_section_id)
        if section != new_section:
            section = new_section
            next_section_id += 1
            proc.update_section(section)

        input = ";".join(items[1:])
        assert proc.transform(input) == Exam(section.get_id(), *items[1:])


@pytest.mark.parametrize("rows", [BILD_ROWS, CAT_ROWS, CSE_ROWS, MATH_ROWS])
def test_exam_processor(setup_exam, rows):
    """Test Exam Processor on select exams"""
    repo, proc = setup_exam

    entries = []

    section = None
    next_section_id = 0
    next_exam_id = 0

    for row in rows:
        items = row.split(";")[4:]

        if items[1] not in EXAM_CODES:
            continue

        new_section = Section(1, items[0], next_section_id)
        if section != new_section:
            section = new_section
            next_section_id += 1
            proc.update_section(section)

        input = ";".join(items[1:])
        proc.process_and_store(input)

        expected = Exam(section.get_id(), *items[1:], next_exam_id)

        assert repo.get_exam(next_exam_id) == expected
        entries.append(expected)
        next_exam_id += 1

    assert repo.get_exams() == entries

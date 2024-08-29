class Course:
    def __init__(
        self, department_id: int, num: int, title: str, units: int, id: int = -1
    ):
        self._department_id = department_id
        self._num = num
        self._title = title
        self._units = units
        self._id = id

    def __eq__(self, other) -> str:
        if not isinstance(other, Course):
            return False

        return (
            self._department_id == other._department_id
            and self._num == other._num
            and self._title == other._title
            and self._units == other._units
        )

    def __hash__(self) -> int:
        return hash(self._department_id, self._num, self._title, self._units)

    def get_department_id(self) -> int:
        return self._department_id

    def get_num(self) -> int:
        return self._num

    def get_title(self) -> str:
        return self._title

    def get_units(self) -> int:
        return self._units

    def get_id(self) -> int:
        return self._id

    def with_id(self, id: int) -> "Course":
        return Course(self._department_id, self._num, self._title, self._units, id)

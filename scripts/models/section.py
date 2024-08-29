class Section:
    def __init__(self, course_id: int, num: str, id: int = -1):
        self._course_id = course_id
        self._num = num
        self._id = id

    def __eq__(self, other) -> str:
        if not isinstance(other, Section):
            return False

        return self._course_id == other._course_id and self._num == other._num

    def __hash__(self) -> int:
        return hash(self._course_id, self._num)

    def get_course_id(self) -> int:
        return self._course_id

    def get_num(self) -> str:
        return self._num

    def get_id(self) -> int:
        return self._id

    def with_id(self, id: int) -> "Section":
        return Section(self._course_id, self._num, id)

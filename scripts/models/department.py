class Department:
    """Stores information about academic department"""

    def __init__(self, code: str, title: str, id: int = -1):
        self._code = code
        self._title = title
        self._id = id

    def __eq__(self, other) -> bool:
        return self._code == other._code and self._title == other._title

    def __hash__(self) -> int:
        return hash(self._code, self._title)

    def get_code(self) -> str:
        return self._code

    def get_title(self) -> str:
        return self._title

    def get_id(self) -> int:
        return self._id

    def with_id(self, id: int) -> "Department":
        return Department(self._code, self._title, id)

class Exam:
    def __init__(
        self,
        section_id: int,
        meeting_type: str,
        days_of_week: str,
        date: str,
        time: str,
        building: str,
        room: str,
        id: int = -1,
    ):
        self._section_id = section_id
        self._meeting_type = meeting_type
        self._days_of_week = days_of_week
        self._date = date
        self._time = time
        self._building = building
        self._room = room
        self._id = id

    def __eq__(self, other) -> bool:
        if not isinstance(other, Exam):
            return False

        return (
            self._section_id == other._section_id
            and self._meeting_type == other._meeting_type
            and self._days_of_week == other._days_of_week
            and self._date == other._date
            and self._time == other._time
            and self._building == other._building
            and self._room == other._room
        )

    def __hash__(self) -> int:
        return hash(
            (
                self._section_id,
                self._meeting_type,
                self._days_of_week,
                self._date,
                self._time,
                self._building,
                self._room,
            )
        )

    def __str__(self) -> str:
        return f"({self._id}) [{self._section_id}] {self._meeting_type} {self._date} ({self._days_of_week}) {self._time} at {self._building} {self._room}"

    def get_section_id(self) -> int:
        return self._section_id

    def get_meeting_type(self) -> str:
        return self._meeting_type

    def get_days_of_week(self) -> str:
        return self._days_of_week

    def get_date(self) -> str:
        return self._date

    def get_time(self) -> str:
        return self._time

    def get_building(self) -> str:
        return self._building

    def get_room(self) -> str:
        return self._room

    def get_id(self) -> int:
        return self._id

    def with_id(self, id: int) -> "Exam":
        return Exam(
            self._section_id,
            self._meeting_type,
            self._days_of_week,
            self._date,
            self._time,
            self._building,
            self._room,
            id,
        )

class Activity:
    def __init__(
        self,
        section_id: int,
        meeting_type: str,
        section_num: str,
        days_of_week: str,
        time: str,
        building: str,
        room: str,
        instructor: str,
        id: int = -1,
    ):
        self._section_id = section_id
        self._meeting_type = meeting_type
        self._section_num = section_num
        self._days_of_week = days_of_week
        self._time = time
        self._building = building
        self._room = room
        self._instructor = instructor
        self._id = id

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Activity):
            return False

        return (
            self._section_id == other._section_id
            and self._meeting_type == other._meeting_type
            and self._section_num == other._section_num
            and self._days_of_week == other._days_of_week
            and self._time == other._time
            and self._building == other._building
            and self._room == other._room
            and self._instructor == other._instructor
        )

    def __hash__(self) -> int:
        return hash(
            self._section_id,
            self._meeting_type,
            self._section_num,
            self._days_of_week,
            self._time,
            self._building,
            self._room,
            self._instructor,
        )

    def get_section_id(self) -> int:
        return self._section_id

    def get_meeting_type(self) -> str:
        return self._meeting_type

    def get_section_num(self) -> str:
        return self._section_num

    def get_days_of_week(self) -> str:
        return self._days_of_week

    def get_time(self) -> str:
        return self._time

    def get_building(self) -> str:
        return self._building

    def get_room(self) -> str:
        return self._room

    def get_instructor(self) -> str:
        return self._instructor

    def get_id(self) -> int:
        return self._id

    def with_id(self, id: int) -> "Activity":
        return Activity(
            self._section_id,
            self._meeting_type,
            self._section_num,
            self._days_of_week,
            self._time,
            self._building,
            self._room,
            self._instructor,
            id,
        )

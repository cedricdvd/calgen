INSTRUCTION_CODES = {
    "AC",
    "CL",
    "CO",
    "DI",
    "FI",
    "FM",
    "FW",
    "IN",
    "IT",
    "LA",
    "LE",
    "MI",
    "MU",
    "OT",
    "PB",
    "PR",
    "RE",
    "SE",
    "ST",
    "TU",
}

DAYS_PATTERN = r"^(M|Tu|W|Th|F|Sa)+$"
TIME_PATTERN = r"^\d{1,2}:\d{2}[ap]-\d{1,2}:\d{2}[ap]$"
INSTRUCTOR_PATTERN = r"^(.*, .*)|(Staff)$"
WAITLIST_PATTERN = r"^FULL\s+Waitlist\(\d+\)$"

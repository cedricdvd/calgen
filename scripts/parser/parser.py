import logging
import re
from abc import ABC, abstractmethod

from bs4 import BeautifulSoup as bs

from constants import (
    DAYS_PATTERN,
    INSTRUCTION_CODES,
    INSTRUCTOR_PATTERN,
    TIME_PATTERN,
    WAITLIST_PATTERN,
)

logger = logging.getLogger(__name__)


class IParser(ABC):

    @abstractmethod
    def parse(self, html: str) -> list[str]:
        pass


class DepartmentParser(IParser):
    """
    Parse the department codes from a table on the UCSD Blink website.

    HTML Format:
    <tbody>
        ...
        <tr>
            <td>{department code}</td>
            <td>{department title}</td>
        </tr>
        ...
    </tbody>
    """

    def parse(self, html: str) -> list[str]:
        logger.info("Parsing department codes")
        soup = bs(html, "html.parser")
        rows = soup.find_all("tr")

        subjects = []

        for row in rows:
            cells = row.find_all("td")

            if len(cells) < 2:
                continue

            code = cells[0].text.strip()
            title = re.sub(r"\s+", " ", cells[1].text.strip())
            subjects.append(";".join([code, title]))
            logger.debug(f"Parsed department: {code} - {title}")

        return subjects


class PageInfoParser(IParser):
    """
    Parse the number of pages per department
    """

    def parse(self, html: str) -> list[str]:
        logger.info("Parsing page numbers")
        soup = bs(html, "html.parser")
        pageNumbers = str(soup.find("td", {"align": "right"}))

        # Extract total number of pages (e.g. 1 of 30)
        total_pages = re.findall(r"\d+", pageNumbers)[1]
        logger.debug(f"Total pages: {total_pages}")
        return [total_pages]


class ScheduleParser(IParser):
    """
    Parse course activities and exams from table on the UCSD Blink website
    """

    def parse(self, html: str) -> list[str]:
        logger.info("Parsing course activities")
        soup = bs(html, "html.parser")

        # Extract course code
        table_html = soup.find("table", {"class": "tbrdr"})
        if table_html is None:
            return []

        # Gather table rows
        table = table_html.find_all("tr")

        dept_row = table[1].find("h2").text
        dept_search = re.search(r"([A-Z]{2,4})", dept_row)

        if dept_search is None:
            return []

        dept = dept_search.expand(r"\1")

        # Initialize scraper variables
        rows = table[4:]

        number = ""
        title = ""
        units = ""
        course_section = ""
        meeting_type = ""
        meeting_section = ""
        date = ""
        days_of_week = ""
        time = ""
        building = ""
        room = ""
        instructor = ""

        output = []

        for row in rows:
            # Check if row is a header
            if not row.has_attr("class"):
                number, title, units = self.parse_header(row)
                course_section = ""
                meeting_type = ""
                meeting_section = ""
                date = ""
                days_of_week = ""
                time = ""
                building = ""
                room = ""
                instructor = ""

                logging.debug(f"Parsed course header: {number} - {title} - {units}")
                continue

            # Check if row is a course meeting or section
            elif row["class"][0] == "sectxt":
                # Course meeting
                (
                    meeting_type,
                    meeting_section,
                    days_of_week,
                    time,
                    building,
                    room,
                    instructor,
                ) = self.parse_section(row)
                date = ""

                # Skip if meeting type is empty
                if meeting_type == "":
                    logger.debug("Skipping empty meeting type")
                    continue

                if course_section == "":
                    logger.debug("Setting course section")
                    course_section = meeting_section

                # Create course activity
                output.append(
                    ";".join(
                        [
                            dept,
                            number,
                            title,
                            units,
                            course_section,
                            meeting_type,
                            meeting_section,
                            days_of_week,
                            time,
                            building,
                            room,
                            instructor,
                        ]
                    )
                )

                logging.debug(
                    f"Logged course activity: {meeting_type} - {meeting_section} - {days_of_week} - {time} - {building} - {room} - {instructor}"
                )

            # Check if row is an exam
            else:
                # Skip if row is not an exam (not enough columns)
                if len(row.find_all("td")) < 3:
                    logging.info("Skipping row with less than 3 columns")
                    continue

                (meeting_type, days_of_week, date, time, building, room) = (
                    self.parse_other(row)
                )
                instructor = ""

                # Create exam row
                output.append(
                    ";".join(
                        [
                            dept,
                            number,
                            title,
                            units,
                            course_section,
                            meeting_type,
                            days_of_week,
                            date,
                            time,
                            building,
                            room,
                        ]
                    )
                )

                logging.debug(
                    f"Logged exam: {meeting_type} - {days_of_week} - {date} - {time} - {building} - {room}"
                )

        return output

    def parse_header(self, row) -> tuple[str, ...]:
        """Get course number, title, and units from header row

        Args:
            row (_type_): HTML row element

        Returns:
            tuple[str]: Tuple containing course number, title, and units
        """
        cells = row.find_all("td", {"class": "crsheader"})
        if len(cells) < 4:
            logging.debug("Skipping header with less than 4 columns")
            return "", "", ""

        number = cells[1].text.strip()

        title_cell = cells[2]

        title = title_cell.find("span").text.strip()
        title_text = re.sub(r"\s+", " ", title_cell.text)
        units_search = re.search(r"\(.*(\d+).*Units\)", title_text)

        if units_search is None:
            logging.debug("Skipping header with no units")
            return "", "", ""

        units = units_search.expand(r"\1")

        return number, title, units

    def parse_section(self, row) -> tuple[str, ...]:
        """
        Get course meeting information from row
        """
        output = ["", "", "", "", "", "", ""]

        # Get and clean course meeting information from row
        cells = [item.text.strip() for item in row.find_all("td")]
        info = [
            re.sub(r"\s+", " ", item) for item in cells if item != "" and item != "TBA"
        ]

        # Ignore row if cancelled
        if "Cancelled" in info:
            logging.debug("Skipping cancelled course")
            return tuple(output)

        index = 0

        # Find instruction code
        while index < len(info) and info[index] not in INSTRUCTION_CODES:
            index += 1

        # Get instruction code and section number
        output[0] = info[index]
        output[1] = info[index + 1]

        index += 2

        # Organize remaining information

        while index < len(info):
            if re.match(DAYS_PATTERN, info[index]):
                output[2] = info[index]
                index += 1
            elif re.match(TIME_PATTERN, info[index]):
                output[3] = info[index]
                index += 1
            elif re.match(INSTRUCTOR_PATTERN, info[index]):
                output[6] = info[index]
                index += 1
            elif not re.match(r"^\d+$", info[index]) and not re.match(
                WAITLIST_PATTERN, info[index]
            ):
                output[4] = info[index]
                output[5] = info[index + 1]
                index += 2
            else:
                index += 1

        return tuple(output)

    def parse_other(self, row) -> tuple[str, ...]:
        # Get exam information from row
        cells = [item.text.strip() for item in row.find_all("td")]
        output = [item for item in cells if item != ""]

        return tuple(output)

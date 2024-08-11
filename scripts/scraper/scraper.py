import re

from bs4 import BeautifulSoup as bs

from constants import (
    DAYS_PATTERN,
    INSTRUCTION_CODES,
    INSTRUCTOR_PATTERN,
    TIME_PATTERN,
    WAITLIST_PATTERN,
)


class IScraper:
    def scrape(self, html: str) -> list[str]:
        pass


class DepartmentScraper(IScraper):
    """
    Scrape the department codes from a table on the UCSD Blink website.

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

    def scrape(self, html: str) -> list[str]:
        soup = bs(html, "html.parser")
        rows = soup.find_all("tr")
        subjects = re.findall(r"<td>([A-Z]{2,4})</td>", str(rows))

        return subjects


class PageInfoScraper(IScraper):
    def scrape(self, html: str) -> list[str]:
        soup = bs(html, "html.parser")
        pageNumbers = str(soup.find("td", {"align": "right"}))

        pageNumbers = re.findall(r"\d+", pageNumbers)
        return [pageNumbers[1]]


class ScheduleScraper(IScraper):
    def scrape(self, html: str) -> list[str]:
        soup = bs(html, "html.parser")

        # Extract course code
        table_html = soup.find("table", {"class": "tbrdr"})
        if table_html is None:
            return []

        table = table_html.find_all("tr")

        dept_row = table[1].find("h2").text
        dept = re.search(r"\(([A-Z]{2,4}).*\)", dept_row).expand(r"\1")

        rows = table[4:]

        number = ""
        title = ""
        units = ""
        meeting_type = ""
        section = ""
        date = ""
        days_of_week = ""
        time = ""
        building = ""
        room = ""
        instructor = ""

        output = []

        for row in rows:
            if not row.has_attr("class"):
                number, title, units = self.scrape_header(row)
                meeting_type = ""
                section = ""
                date = ""
                days_of_week = ""
                time = ""
                building = ""
                room = ""
                instructor = ""
                continue

            elif row["class"][0] == "sectxt":
                # Course meeting
                (
                    meeting_type,
                    section,
                    days_of_week,
                    time,
                    building,
                    room,
                    instructor,
                ) = self.scrape_section(row)
                date = ""

                if meeting_type == "":
                    continue

                output.append(
                    ";".join(
                        [
                            f"{dept} {number}",
                            title,
                            units,
                            meeting_type,
                            section,
                            days_of_week,
                            time,
                            building,
                            room,
                            instructor,
                        ]
                    )
                )
            else:
                # other meetings or exams
                (meeting_type, days_of_week, date, time, building, room) = (
                    self.scrape_other(row)
                )
                instructor = ""

                output.append(
                    ";".join(
                        [
                            f"{dept} {number}",
                            title,
                            units,
                            meeting_type,
                            days_of_week,
                            date,
                            time,
                            building,
                            room,
                        ]
                    )
                )

        return output

    def scrape_header(self, row) -> tuple[str]:
        cells = row.find_all("td", {"class": "crsheader"})
        if len(cells) < 4:
            return "", "", ""

        number = cells[1].text.strip()

        title_cell = cells[2]

        title = title_cell.find("span").text.strip()
        title_text = re.sub(r"\s+", " ", title_cell.text)
        units = re.search(r"\(.*(\d+).*Units\)", title_text).expand(r"\1")

        return number, title, units

    def scrape_section(self, row) -> tuple[str]:
        output = ["", "", "", "", "", "", ""]
        cells = [item.text.strip() for item in row.find_all("td")]
        info = [item for item in cells if item != "" and item != "TBA"]

        if "Cancelled" in info:
            return tuple(output)

        index = 0

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

        print(output)
        return tuple(output)

    def scrape_other(self, row) -> tuple[str]:
        cells = [item.text.strip() for item in row.find_all("td")]
        output = [item for item in cells if item != ""]

        return tuple(output)

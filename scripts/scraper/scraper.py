import logging
from parser import DepartmentParser

from processor import DepartmentProcessor
from repository import SimpleRepo
from requester import SimpleRequester

logger = logging.getLogger(__name__)


class Scraper:
    """Class that scrapes a website for data and stores it into a repository"""

    def __init__(self, repo: SimpleRepo):
        """Class that scrapes a website for data and stores it into a repository

        Args:
            repo (SimpleRepo): Repository to store data into
        """
        self._repo = repo
        self._departments_count = 0
        self._courses_count = 0
        self._sections_count = 0
        self._activities_count = 0
        self._exams_count = 0

    def scrape(self):
        """Main function to scrape data from UCSD website and store it into
        repository"""
        pass

    def get_departments_count(self) -> int:
        return self._departments_count

    def get_courses_count(self) -> int:
        return self._courses_count

    def get_sections_count(self) -> int:
        return self._sections_count

    def get_activities_count(self) -> int:
        return self._activities_count

    def get_exams_count(self) -> int:
        return self._exams_count

    def _scrape_subject_codes(self, requester: SimpleRequester) -> bool:
        """Scrapes subject codes from UCSD Blink website

        Args:
            requester (SimpleRequester): Requester object to make requests

        Returns:
            bool: True if scraping was successful, False otherwise
        """
        subjects_html = requester.get("")

        if not subjects_html:
            logging.error("No respone from UCSD Blink")
            return False

        parser = DepartmentParser()
        processor = DepartmentProcessor(self._repo)

        subjects = parser.parse(subjects_html)

        for subject in subjects:
            logging.debug("Processing subject: %s", subject)
            processor.process_and_store(subject)
            self._departments_count += 1

        return True

    def _scrape_department(self, code: str):
        """Scrapes department courses from UCSD Schedule of Classes

        Args:
            code (str): Department code
        """
        pass

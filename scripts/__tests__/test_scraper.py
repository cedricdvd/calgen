import os
from unittest.mock import MagicMock, patch

import pytest
from requests import Session
from requests.exceptions import RequestException

from constants import SCHEDULE_URL, SUBJECT_CODES_URL
from models import Department
from repository import SimpleRepo
from requester import SimpleRequester as Requester
from scraper import Scraper

DATA_PATH = os.path.join(os.path.dirname(__file__), "data", "scraper_sites")


def get_html(*args) -> str:
    with open(os.path.abspath(os.path.join(DATA_PATH, *args)), "r") as f:
        return "\n".join(f.readlines())


@pytest.fixture
def mock_get():

    mock_get = MagicMock(name="mockGet")
    mock_response = MagicMock(name="mockResponse")

    def side_effect(*args, **kwargs):
        if args[0] == SUBJECT_CODES_URL:
            mock_response.text = get_html("subject_codes.html")
        else:
            raise RequestException("Error")

        return mock_response

    mock_get.side_effect = side_effect
    return mock_get


def test_scrape_subject_codes(mock_get):
    """
    Test that Scraper scrapes department codes and names
    """
    with patch.object(Session, "get", mock_get):
        requester = Requester(SUBJECT_CODES_URL)
        repo = SimpleRepo()
        scraper = Scraper(repo)

        expected_departments = [
            Department("BILD", "Biology/ Lower Division", 0),
            Department("CSE", "Computer Science and Engineering", 1),
            Department("HIUS", "History of the United States", 2),
            Department("MAE", "Mechanical and Aerospace Engineering", 3),
            Department("MATH", "Mathematics", 4),
            Department("PHYS", "Physics", 5),
        ]

        scraper._scrape_subject_codes(requester)

        assert expected_departments == repo.get_departments()
        assert len(expected_departments) == scraper.get_departments_count()

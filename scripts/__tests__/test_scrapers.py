import os

import pytest
from bs4 import BeautifulSoup as bs

from constants import CAT_ROWS, CSE_ROWS, MATH_ROWS
from scraper import DepartmentScraper, IScraper, PageInfoScraper, ScheduleScraper

os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), "data"))


def get_html(*args) -> str:
    with open(os.path.abspath(os.path.join(*args)), "r") as f:
        return "\n".join(f.readlines())


def get_soup(*args) -> bs:
    return bs(get_html(*args), "html.parser")


def get_scraper(scraper_type: str) -> IScraper:
    if scraper_type == "dpt":
        return DepartmentScraper()
    elif scraper_type == "page":
        return PageInfoScraper()
    elif scraper_type == "sch":
        return ScheduleScraper()
    else:
        return None


@pytest.mark.parametrize(
    "file,expected",
    [
        ("ucsd_blink.html", ["SE", "SEV", "SIO", "SIOB", "SIOC"]),
    ],
)
def test_department_scraper(file, expected):
    """
    Test Department Scraper on subset of UCSD Blink HTML
    """
    html = get_html(file)
    assert expected == get_scraper("dpt").scrape(html)


@pytest.mark.parametrize(
    "file,expected",
    [
        ("ucsd_cat.html", ["4"]),
        ("ucsd_cse.html", ["31"]),
        ("ucsd_math.html", ["21"]),
    ],
)
def test_page_scraper(file, expected):
    """
    Test Page Scraper on Different Subjects
    """

    html = get_html(file)
    assert expected == get_scraper("page").scrape(html)


@pytest.mark.parametrize(
    "file,expected",
    [
        ("normal.html", ("124", "Sixth College Practicum", "4")),
        ("nolinks.html", ("", "", "")),
        ("nonenrtxt.html", ("", "", "")),
    ],
)
def test_header_scrape(file, expected):
    """
    Test that ScheduleScraper returns correct information
    """
    soup = get_soup("fragments", "header", file)
    assert expected == get_scraper("sch").scrape_header(soup)


@pytest.mark.parametrize(
    "file,expected",
    [
        (
            "normal.html",
            ("DI", "A06", "W", "7:00p-7:50p", "APM", "B402A", "Ioana, Adrian"),
        ),
        ("cancelled.html", ("", "", "", "", "", "", "")),
        ("tba_1.html", ("LA", "A50", "", "", "", "", "")),
        ("tba_2.html", ("PR", "B01", "", "", "", "", "Rose, Becca Rae")),
        (
            "tba_3.html",
            ("SE", "011", "TuTh", "12:30p-1:50p", "", "", "Vanderschuit, Maya Alysia"),
        ),
    ],
)
def test_section_scrape(file, expected):
    """
    Test that ScheduleScraper returns correct information
    """
    soup = get_soup("fragments", "section", file)
    assert expected == get_scraper("sch").scrape_section(soup)


@pytest.mark.parametrize(
    "file,expected",
    [
        (
            "final.html",
            ("FI", "12/13/2024", "F", "8:00a-10:59a", "TBA", "TBA"),
        ),
        (
            "ot.html",
            ("OT", "10/18/2024", "F", "11:00a-11:50a", "TBA", "TBA"),
        ),
    ],
)
def test_other_scrape(file, expected):
    """
    Test that ScheduleScraper returns correct information
    """
    soup = get_soup("fragments", "other", file)
    assert expected == get_scraper("sch").scrape_other(soup)


@pytest.mark.parametrize(
    "file,expected",
    [
        ("ucsd_cse.html", CSE_ROWS),
        ("ucsd_cat.html", CAT_ROWS),
        ("ucsd_math.html", MATH_ROWS),
    ],
)
def test_schedule_scrape(file, expected):
    """
    Test that ScheduleScraper returns correct information
    """
    html = get_html(file)
    assert expected == get_scraper("sch").scrape(html)

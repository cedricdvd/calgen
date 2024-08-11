from requester import SimpleRequester
from scraper import DepartmentScraper, PageInfoScraper

# req = SimpleRequester(base_url='https://act.ucsd.edu/scheduleOfClasses/scheduleOfClassesStudentResult.htm')
# print(req.get('?selectedTerm=SP23&selectedSubjects=CAT&selectedSubjects=SYN&page='))

# https://act.ucsd.edu/scheduleOfClasses/scheduleOfClassesStudentResult.htm?selectedTerm=FA24&selectedSubjects=CAT&page=

req = SimpleRequester(
    base_url="https://blink.ucsd.edu/instructors/courses/schedule-of-classes/subject-codes.html"
)
DepartmentScraper().scrape(req.get())

req = SimpleRequester(
    base_url="https://act.ucsd.edu/scheduleOfClasses/scheduleOfClassesStudentResult.htm"
)
PageInfoScraper().scrape(req.get("?selectedTerm=FA24&selectedSubjects=CSE&page="))

from parser import DepartmentParser, PageInfoParser

from requester import SimpleRequester

url = "https://act.ucsd.edu/scheduleOfClasses/scheduleOfClassesStudentResult.htm"

# req = SimpleRequester(base_url=url)
# print(req.get('?selectedTerm=SP23&selectedSubjects=CAT&selectedSubjects=SYN&page='))

# https://act.ucsd.edu/scheduleOfClasses/scheduleOfClassesStudentResult.htm?selectedTerm=FA24&selectedSubjects=CAT&page=

code_url = (
    "https://blink.ucsd.edu/instructors/courses/schedule-of-classes/subject-codes.html"
)

req = SimpleRequester(base_url=code_url)
DepartmentParser().parse(req.get())

req = SimpleRequester(
    base_url="https://act.ucsd.edu/scheduleOfClasses/scheduleOfClassesStudentResult.htm"
)
PageInfoParser().parse(req.get("?selectedTerm=FA24&selectedSubjects=CSE&page="))

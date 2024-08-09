from requester import SimpleRequester

req = SimpleRequester(base_url='https://act.ucsd.edu/scheduleOfClasses/scheduleOfClassesStudent.htm')

print(req.get())
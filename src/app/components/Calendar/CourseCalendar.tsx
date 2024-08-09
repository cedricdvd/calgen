import { useMemo } from "react";

import ICourse from "@/lib/model/courses/course-interface";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

interface CourseCalendarProps {
  courses: ICourse[];
}

const localizer = momentLocalizer(moment);

function CourseCalendar({ courses }: CourseCalendarProps) {
  const events = [
    {
      title: "CSE 123 LE",
      start: new Date(2024, 8, 23, 10, 0),
      end: new Date(2024, 8, 23, 10, 50),
    },
    {
      title: "CSE 123 LE",
      start: new Date(2024, 8, 25, 10, 0),
      end: new Date(2024, 8, 25, 10, 50),
    },
    {
      title: "CSE 123 LE",
      start: new Date(2024, 8, 27, 10, 0),
      end: new Date(2024, 8, 27, 10, 50),
    },
    {
      title: "CSE 123 DI",
      start: new Date(2024, 8, 27, 11, 0),
      end: new Date(2024, 8, 27, 11, 50),
    },
  ];

  const { defaultDate } = useMemo(
    () => ({
      defaultDate: new Date(2024, 8, 22),
    }),
    [],
  );

  return (
    <div className="course-calendar">
      <Calendar
        localizer={localizer}
        defaultDate={defaultDate}
        defaultView={Views.WEEK}
        views={[Views.WEEK]}
        formats={{
          dayFormat: "ddd",
        }}
        min={new Date(2024, 8, 22, 7, 0)}
        max={new Date(2024, 8, 22, 23, 0)}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
}

export default CourseCalendar;

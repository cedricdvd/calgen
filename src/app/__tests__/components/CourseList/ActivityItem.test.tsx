import { render, screen } from "@testing-library/react";

import ActivityItem from "@/app/components/CourseList/ActivityItem";
import Lecture from "@/lib/model/activities/activity-types/lecture";

describe("Test ActivityItem", () => {
  test("Test Default Render", () => {
    render(
      <ActivityItem
        activity={
          new Lecture("12/09/2021", "W", "12:00AM-3:00AM", "WLH", "2001")
        }
      />,
    );

    expect(screen.getByText("LE")).toBeInTheDocument();
    expect(screen.getByText("12/09/2021")).toBeInTheDocument();
    expect(screen.getByText("W")).toBeInTheDocument();
    expect(screen.getByText("12:00AM-3:00AM")).toBeInTheDocument();
    expect(screen.getByText("WLH")).toBeInTheDocument();
  });
});

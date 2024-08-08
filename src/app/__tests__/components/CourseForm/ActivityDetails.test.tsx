import { render, screen, cleanup } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";

import ActivityDetails from "@/app/components/CourseForm/ActivityDetails";
import Activity from "@/lib/model/activities/activity";
import Discussion from "@/lib/model/activities/activity-types/discussion";
import Lab from "@/lib/model/activities/activity-types/lab";
import Studio from "@/lib/model/activities/activity-types/studio";
import Lecture from "@/lib/model/activities/activity-types/lecture";

describe("Test ActivityDetails", () => {
  const user: UserEvent = userEvent.setup();
  let activities: Activity[];
  let lecture: string;
  let lab: string;
  let discussion: string;
  let studio: string;

  function setLecture(value: string) {
    lecture = value;
  }

  function setLab(value: string) {
    lab = value;
  }

  function setDiscussion(value: string) {
    discussion = value;
  }

  function setStudio(value: string) {
    studio = value;
  }

  function renderActivity() {
    cleanup();
    render(
      <ActivityDetails
        activities={activities}
        lecture={lecture}
        lab={lab}
        discussion={discussion}
        studio={studio}
        setLecture={setLecture}
        setLab={setLab}
        setDiscussion={setDiscussion}
        setStudio={setStudio}
      />,
    );
  }

  beforeEach(() => {
    activities = [];
    lecture = "";
    lab = "";
    discussion = "";
    studio = "";
  });

  test("Test Default Render", () => {
    renderActivity();

    expect(screen.getByText("Meetings")).toBeInTheDocument();
    expect(screen.getByText("No meetings")).toBeInTheDocument();
  });

  describe("Render multiple lectures options", () => {
    beforeEach(() => {
      activities = [
        new Lecture("A00", "MWF", "12:00am-1:00am", "EBUB3", "100"),
        new Lecture("A01", "TuTh", "2:00am-3:00am", "PCYNH", "200"),
      ];

      renderActivity();
    });

    test("Test Render", () => {
      expect(screen.getByText("Lecture")).toBeInTheDocument();

      const options = screen.getAllByRole("option");
      expect(options).toHaveLength(3);
      expect(options[0]).toHaveTextContent("Select a lecture");
      expect(options[1]).toHaveTextContent("A00");
      expect(options[2]).toHaveTextContent("A01");

      expect(screen.queryByText("Lab")).not.toBeInTheDocument();
      expect(screen.queryByText("Discussion")).not.toBeInTheDocument();
      expect(screen.queryByText("Studio")).not.toBeInTheDocument();
    });

    test("Choose lecture option", async () => {
      let selects = screen.getByRole("combobox");
      await user.selectOptions(selects, "A01");

      renderActivity();

      expect(screen.getByText("A01")).toBeInTheDocument();
      expect(screen.getByText("TuTh")).toBeInTheDocument();
      expect(screen.getByText("2:00am-3:00am")).toBeInTheDocument();

      selects = screen.getByRole("combobox");
      await user.selectOptions(selects, "A00");

      renderActivity();

      expect(screen.getByText("A00")).toBeInTheDocument();
      expect(screen.getByText("MWF")).toBeInTheDocument();
      expect(screen.getByText("12:00am-1:00am")).toBeInTheDocument();
    });
  });

  describe("Render multiple lab options", () => {
    beforeEach(() => {
      activities = [
        new Lab("B00", "MWF", "12:00am-1:00am", "EBUB3", "100"),
        new Lab("B01", "TuTh", "2:00am-3:00am", "PCYNH", "200"),
      ];

      renderActivity();
    });

    test("Test Render", () => {
      expect(screen.getByText("Lab")).toBeInTheDocument();

      const options = screen.getAllByRole("option");
      expect(options).toHaveLength(3);
      expect(options[0]).toHaveTextContent("Select a lab");
      expect(options[1]).toHaveTextContent("B00");
      expect(options[2]).toHaveTextContent("B01");

      expect(screen.queryByText("Lecture")).not.toBeInTheDocument();
      expect(screen.queryByText("Discussion")).not.toBeInTheDocument();
      expect(screen.queryByText("Studio")).not.toBeInTheDocument();
    });

    test("Choose lab option", async () => {
      let selects = screen.getByRole("combobox");
      await user.selectOptions(selects, "B01");

      renderActivity();

      expect(screen.getByText("B01")).toBeInTheDocument();
      expect(screen.getByText("TuTh")).toBeInTheDocument();
      expect(screen.getByText("2:00am-3:00am")).toBeInTheDocument();

      selects = screen.getByRole("combobox");
      await user.selectOptions(selects, "B00");

      renderActivity();

      expect(screen.getByText("B00")).toBeInTheDocument();
      expect(screen.getByText("MWF")).toBeInTheDocument();
      expect(screen.getByText("12:00am-1:00am")).toBeInTheDocument();
    });
  });

  describe("Render multiple discussion options", () => {
    beforeEach(() => {
      activities = [
        new Discussion("C00", "MWF", "12:00am-1:00am", "EBUB3", "100"),
        new Discussion("C01", "TuTh", "2:00am-3:00am", "PCYNH", "200"),
      ];

      renderActivity();
    });

    test("Test Render", () => {
      expect(screen.getByText("Discussion")).toBeInTheDocument;

      const options = screen.getAllByRole("option");
      expect(options).toHaveLength(3);
      expect(options[0]).toHaveTextContent("Select a discussion");
      expect(options[1]).toHaveTextContent("C00");
      expect(options[2]).toHaveTextContent("C01");

      expect(screen.queryByText("Lecture")).not.toBeInTheDocument();
      expect(screen.queryByText("Lab")).not.toBeInTheDocument();
      expect(screen.queryByText("Studio")).not.toBeInTheDocument();
    });

    test("Choose discussion option", async () => {
      let selects = screen.getByRole("combobox");
      await user.selectOptions(selects, "C01");

      renderActivity();

      expect(screen.getByText("C01")).toBeInTheDocument();
      expect(screen.getByText("TuTh")).toBeInTheDocument();
      expect(screen.getByText("2:00am-3:00am")).toBeInTheDocument();

      selects = screen.getByRole("combobox");
      await user.selectOptions(selects, "C00");

      renderActivity();

      expect(screen.getByText("C00")).toBeInTheDocument();
      expect(screen.getByText("MWF")).toBeInTheDocument();
      expect(screen.getByText("12:00am-1:00am")).toBeInTheDocument();
    });
  });

  describe("Render multiple studio options", () => {
    beforeEach(() => {
      activities = [
        new Studio("D00", "MWF", "12:00am-1:00am", "EBUB3", "100"),
        new Studio("D01", "TuTh", "2:00am-3:00am", "PCYNH", "200"),
      ];

      renderActivity();
    });

    test("Test Render", () => {
      expect(screen.getByText("Studio")).toBeInTheDocument;

      const options = screen.getAllByRole("option");
      expect(options).toHaveLength(3);
      expect(options[0]).toHaveTextContent("Select a studio");
      expect(options[1]).toHaveTextContent("D00");
      expect(options[2]).toHaveTextContent("D01");

      expect(screen.queryByText("Lecture")).not.toBeInTheDocument();
      expect(screen.queryByText("Lab")).not.toBeInTheDocument();
      expect(screen.queryByText("Discussion")).not.toBeInTheDocument();
    });

    test("Choose studio option", async () => {
      let selects = screen.getByRole("combobox");
      await user.selectOptions(selects, "D01");

      renderActivity();

      expect(screen.getByText("D01")).toBeInTheDocument();
      expect(screen.getByText("TuTh")).toBeInTheDocument();
      expect(screen.getByText("2:00am-3:00am")).toBeInTheDocument();

      selects = screen.getByRole("combobox");
      await user.selectOptions(selects, "D00");

      renderActivity();

      expect(screen.getByText("D00")).toBeInTheDocument();
      expect(screen.getByText("MWF")).toBeInTheDocument();
      expect(screen.getByText("12:00am-1:00am")).toBeInTheDocument();
    });
  });

  test("Test with many activity options", () => {
    activities = [
      new Lecture("A00", "MWF", "12:00am-1:00am", "EBUB3", "100"),
      new Lab("B00", "MWF", "12:00am-1:00am", "EBUB3", "100"),
      new Lab("B01", "TuTh", "2:00am-3:00am", "PCYNH", "200"),
      new Discussion("C00", "MWF", "12:00am-1:00am", "EBUB3", "100"),
      new Discussion("C01", "TuTh", "2:00am-3:00am", "PCYNH", "200"),
      new Discussion("C02", "MWF", "12:00am-1:00am", "EBUB3", "100"),
      new Studio("D00", "MWF", "12:00am-1:00am", "EBUB3", "100"),
    ];

    renderActivity();

    const selects = screen.getAllByRole("combobox");
    expect(selects).toHaveLength(4);

    expect(screen.getByText("Lecture")).toBeInTheDocument();
    expect(screen.getByText("Lab")).toBeInTheDocument();
    expect(screen.getByText("Discussion")).toBeInTheDocument();
    expect(screen.getByText("Studio")).toBeInTheDocument();

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(11);

    expect(options[0]).toHaveTextContent("Select a lecture");
    expect(options[1]).toHaveTextContent("A00");

    expect(options[2]).toHaveTextContent("Select a lab");
    expect(options[3]).toHaveTextContent("B00");
    expect(options[4]).toHaveTextContent("B01");

    expect(options[5]).toHaveTextContent("Select a discussion");
    expect(options[6]).toHaveTextContent("C00");
    expect(options[7]).toHaveTextContent("C01");
    expect(options[8]).toHaveTextContent("C02");

    expect(options[9]).toHaveTextContent("Select a studio");
    expect(options[10]).toHaveTextContent("D00");
  });
});

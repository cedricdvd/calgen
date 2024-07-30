import Select from "../ui/Select";

import Activity from "@/lib/model/activities/activity";
import Lecture from "@/lib/model/activities/activity-types/lecture";
import Lab from "@/lib/model/activities/activity-types/lab";
import Discussion from "@/lib/model/activities/activity-types/discussion";
import Studio from "@/lib/model/activities/activity-types/studio";

interface ActivityDetailsProps {
  activities: Activity[];
  lecture: string;
  lab: string;
  discussion: string;
  studio: string;
  setLecture: (value: string) => void;
  setLab: (value: string) => void;
  setDiscussion: (value: string) => void;
  setStudio: (value: string) => void;
}

function ActivityDetails({
  activities,
  lecture,
  lab,
  discussion,
  studio,
  setLecture,
  setLab,
  setDiscussion,
  setStudio,
}: ActivityDetailsProps) {
  let lectures: Lecture[] = [];
  let labs: Lab[] = [];
  let discussions: Discussion[] = [];
  let studios: Studio[] = [];

  function handleSelect(setValue: (value: string) => void, value: string) {
    setValue(value);
  }

  for (let activity of activities) {
    if (activity instanceof Lecture) {
      lectures.push(activity);
    } else if (activity instanceof Lab) {
      labs.push(activity);
    } else if (activity instanceof Discussion) {
      discussions.push(activity);
    } else if (activity instanceof Studio) {
      studios.push(activity);
    }
  }

  return (
    <div>
      <h2>Meetings</h2>
      {activities.length == 0 && <p>No meetings</p>}
      {lectures.length > 0 && (
        <>
          <p>Lecture</p>
          <Select
            options={lectures.map((lecture) => lecture.sectionNum)}
            selected={lecture}
            setSelected={setLecture}
            handleSelected={handleSelect}
            disabledMessage={"Select a lecture"}
          />
          {lecture !== "" && (
            <>
              <p>
                {lectures.find((l) => l.sectionNum === lecture)?.daysOfWeek}
              </p>
              <p>{lectures.find((l) => l.sectionNum === lecture)?.timeOfDay}</p>
            </>
          )}
        </>
      )}
      {labs.length > 0 && (
        <>
          <p>Lab</p>
          <Select
            options={labs.map((lab) => lab.sectionNum)}
            selected={lab}
            setSelected={setLab}
            handleSelected={handleSelect}
            disabledMessage={"Select a lab"}
          />
          {lab !== "" && (
            <>
              <p>{labs.find((l) => l.sectionNum === lab)?.daysOfWeek}</p>
              <p>{labs.find((l) => l.sectionNum === lab)?.timeOfDay}</p>
            </>
          )}
        </>
      )}
      {discussions.length > 0 && (
        <>
          <p>Discussion</p>
          <Select
            options={discussions.map((discussion) => discussion.sectionNum)}
            selected={discussion}
            setSelected={setDiscussion}
            handleSelected={handleSelect}
            disabledMessage={"Select a discussion"}
          />
          {discussion !== "" && (
            <>
              <p>
                {
                  discussions.find((d) => d.sectionNum === discussion)
                    ?.daysOfWeek
                }
              </p>
              <p>
                {
                  discussions.find((d) => d.sectionNum === discussion)
                    ?.timeOfDay
                }
              </p>
            </>
          )}
        </>
      )}
      {studios.length > 0 && (
        <>
          <p>Studio</p>
          <Select
            options={studios.map((studio) => studio.sectionNum)}
            selected={studio}
            setSelected={setStudio}
            handleSelected={handleSelect}
            disabledMessage={"Select a studio"}
          />
          {studio !== "" && (
            <>
              <p>{studios.find((s) => s.sectionNum === studio)?.daysOfWeek}</p>
              <p>{studios.find((s) => s.sectionNum === studio)?.timeOfDay}</p>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default ActivityDetails;

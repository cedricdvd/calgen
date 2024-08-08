import IActivity from "@/lib/model/activities/activity-interface";

interface ActivityItemProps {
  activity: IActivity;
}

function ActivityItem({ activity }: ActivityItemProps) {
  return (
    <div className="activity-item">
      <div>{activity.sectionNum}</div>
      <div>{activity.type}</div>
      <div>{activity.daysOfWeek}</div>
      <div>{activity.timeOfDay}</div>
      <div>{activity.location}</div>
    </div>
  );
}

export default ActivityItem;

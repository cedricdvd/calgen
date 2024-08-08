import IActivity from "@/lib/model/activities/activity-interface";

interface ActivityItemProps {
  activity: IActivity;
}

function ActivityItem({ activity }: ActivityItemProps) {
  return (
    <div className="activity-item">
      <p>{activity.sectionNum}</p>
      <p>{activity.type}</p>
      <p>{activity.daysOfWeek}</p>
      <p>{activity.timeOfDay}</p>
      <p>{activity.location}</p>
    </div>
  );
}

export default ActivityItem;

import SectionInfo from "@/lib/model/section-info";

interface SectionItemProps {
  courseName: string;
  sectionType: string;
  section: SectionInfo;
}

function SectionItem({ courseName, sectionType, section }: SectionItemProps) {
  return (
    <div className="grid-row">
      <div className="grid-item">{courseName}</div>
      <div className="grid-item">{sectionType}</div>
      <div className="grid-item">{section.section}</div>
      <div className="grid-item">{section.days}</div>
      <div className="grid-item">{section.time}</div>
      <div className="grid-item">{section.building}</div>
      <div className="grid-item">{section.room}</div>
    </div>
  );
}

export default SectionItem;

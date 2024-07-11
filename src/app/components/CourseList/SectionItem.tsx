import SectionInfo from "@/lib/model/section-info";

interface SectionItemProps {
  sectionType: string;
  section: SectionInfo;
}

function SectionItem({ sectionType, section }: SectionItemProps) {
  return (
    <div className="grid-container">
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

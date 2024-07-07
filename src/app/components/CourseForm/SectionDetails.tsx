import CourseSection from "@/lib/model/course-section";
import Select from "../ui/Select";

interface SectionDetailsProps {
  section: CourseSection;
  discussionSection: string;
  labSection: string;
  studioSection: string;
  setDiscussionSection: (value: string) => void;
  setLabSection: (value: string) => void;
  setStudioSection: (value: string) => void;
}

function SectionDetails({
  section,
  discussionSection,
  labSection,
  studioSection,
  setDiscussionSection,
  setLabSection,
  setStudioSection,
}: SectionDetailsProps) {
  function handleSelect(setSelected: (value: string) => void, value: string) {
    setSelected(value);
  }

  return (
    <div>
      {section.getNumberOfDiscussions() > 0 && (
        <Select
          options={section.getDiscussionSections()}
          selected={discussionSection}
          setSelected={setDiscussionSection}
          handleSelected={handleSelect}
          disabledMessage={"Select a discussion section"}
        />
      )}
      {section.getNumberOfLabs() > 0 && (
        <Select
          options={section.getLabSections()}
          selected={labSection}
          setSelected={setLabSection}
          handleSelected={handleSelect}
          disabledMessage={"Select a lab section"}
        />
      )}
      {section.getNumberOfStudios() > 0 && (
        <Select
          options={section.getStudioSections()}
          selected={studioSection}
          setSelected={setStudioSection}
          handleSelected={handleSelect}
          disabledMessage={"Select a studio section"}
        />
      )}
    </div>
  );
}

export default SectionDetails;

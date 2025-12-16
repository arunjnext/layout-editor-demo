import { EditorPanelHeader } from "@/components/EditorUI/EditorPanelHeader";
import { editorSections, resumeOptionValue } from "@/lib/utils/resumeConstants";

export const Education = () => {
  return (
    <>
      <EditorPanelHeader
        sectionKey={resumeOptionValue.education}
        description={
          editorSections.find(
            (section) => section.id === resumeOptionValue.education
          )?.description
        }
      />
      <div className="p-4 text-muted-foreground">
        Education section - To be implemented
      </div>
    </>
  );
};

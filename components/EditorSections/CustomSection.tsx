import { EditorPanelHeader } from "@/components/EditorUI/EditorPanelHeader";
import { resumeOptionValue } from "@/lib/utils/resumeConstants";

export const CustomSection = () => {
  return (
    <>
      <EditorPanelHeader
        sectionKey={resumeOptionValue.customSections}
        description="Showcase your unique experiences"
      />
      <div className="p-4 text-muted-foreground">
        Custom Sections - To be implemented
      </div>
    </>
  );
};

import { EditorPanelHeader } from "@/components/EditorUI/EditorPanelHeader";
import { resumeOptionValue } from "@/lib/utils/resumeConstants";

export const Experience = () => {
  return (
    <>
      <EditorPanelHeader
        sectionKey={resumeOptionValue.experience}
        description="yourWorkHistoryAndAchievements"
      />
      <div className="p-4 text-muted-foreground">
        Experience section - To be implemented
      </div>
    </>
  );
};

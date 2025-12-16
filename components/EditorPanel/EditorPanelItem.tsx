"use client";

import {
  EditorSectionReorder,
  EditorSectionVisibility,
} from "@/components/EditorUI/EditorSectionPanel";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { useEditor } from "@/hooks/useEditor";
import { cn } from "@/lib/utils/helpers";
import type { EditorSection } from "@/lib/utils/resumeConstants";
import { resumeOptionValue } from "@/lib/utils/resumeConstants";
import { ChevronRight } from "lucide-react";

const defaultTranslations: Record<string, string> = {
  personalDetails: "Personal Details",
  experience: "Experience",
  skills: "Skills",
  education: "Education",
  proficiencies: "Proficiencies",
  customSections: "Custom Sections",
  yourNameSummaryImageAndTitle: "Your name, summary, image and title",
  yourWorkHistoryAndAchievements: "Your work history and achievements",
  keyAreasThatIllustrateYourStrengths:
    "Key areas that illustrate your strengths",
  whereYouStudiedAndYourQualifications:
    "Where you studied and your qualifications",
  certificatesAndLanguages: "Certificates and languages",
  showcaseUniqueExperiences: "Showcase unique experiences",
};

interface EditorPanelItemProps {
  section: EditorSection & {
    id: string;
    sectionKey: string;
    isVisible: boolean;
  };
}

export const EditorPanelItem = ({
  section,
}: EditorPanelItemProps) => {
  const { handlePanelClick, sectionsVisibility, visiblityControls } =
    useEditor();
  const { id, sectionKey } = section;
  const isVisible =
    id in sectionsVisibility ? sectionsVisibility[id] : section.isVisible;
  const isPersonalDetails = sectionKey === resumeOptionValue.personalDetails;

  const { title, description, icon: Icon, sectionKey: sectionName } = section;

  const displayTitle =
    title === sectionName ? defaultTranslations[title] || sectionName : sectionName;
  const displayDescription = defaultTranslations[description] || description;

  return (
    <div id={id} className="relative">
      <Item
        variant="outline"
        size="default"
        className={cn(
          "border-b border-border rounded-none border-x-0 border-t-0 bg-background px-4 lg:px-6 py-2",
          !isVisible && "opacity-35",
          isVisible && "hover:bg-background-alt cursor-pointer"
        )}
        onClick={() => isVisible && handlePanelClick(sectionKey)}
      >
        <EditorSectionReorder
          dragControls={undefined}
          isVisible={isVisible}
          className={cn(isPersonalDetails && "invisible")}
        />
        <ItemMedia
          variant="icon"
          className="bg-accent rounded-[10px] p-1.5 h-full flex items-center justify-center"
        >
          <Icon className="text-muted-foreground size-5" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="text-foreground max-w-52 w-full truncate sm:max-w-80">
            {displayTitle}
          </ItemTitle>
          <ItemDescription className="max-w-52 w-full truncate sm:max-w-80">
            {displayDescription}
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          {visiblityControls && !isPersonalDetails ? (
            <EditorSectionVisibility section={section} isVisible={isVisible} />
          ) : (
            <Button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePanelClick(sectionKey);
              }}
              variant="ghost"
              size="sm"
              disabled={!isVisible}
              className="disabled:opacity-35"
            >
              <ChevronRight size={16} className="text-muted-foreground" />
            </Button>
          )}
        </ItemActions>
      </Item>
    </div>
  );
};

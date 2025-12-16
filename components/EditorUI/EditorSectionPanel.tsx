"use client";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useEditor } from "@/hooks/useEditor";
import type { ResumeSection } from "@/lib/utils/defaultResume";
import { cn } from "@/lib/utils/helpers";
import type { EditorSection } from "@/lib/utils/resumeConstants";
import { ChevronRight, Eye, EyeOff, GripVertical } from "lucide-react";
import type { ReactNode } from "react";

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

interface EditorSectionPanelProps {
  children: ReactNode;
  isVisible: boolean;
}

export const EditorSectionPanel = ({
  children,
  isVisible,
}: EditorSectionPanelProps) => {
  return (
    <div
      className={cn(
        "relative flex items-center gap-3 border-b border-border transition-all select-none bg-background px-4 lg:px-6 py-2",
        isVisible ? "hover:bg-background-alt" : ""
      )}
    >
      {children}
    </div>
  );
};

interface EditorSectionDetailsProps {
  onClick: () => void;
  section: EditorSection & { sectionKey: string; sectionName?: string };
  isVisible: boolean;
  translations?: Record<string, string>;
}

export const EditorSectionDetails = ({
  onClick,
  section,
  isVisible,
  translations = {},
}: EditorSectionDetailsProps) => {
  const { title, description, icon: Icon, sectionName } = section;
  const tc = { ...defaultTranslations, ...translations };

  return (
    <Button
      variant="ghost"
      size="sm"
      type="button"
      onClick={onClick}
      className={cn(
        "flex-1 flex items-center justify-start gap-3 px-0 py-5 [&_svg]:size-5 disabled:opacity-35 "
      )}
      disabled={!isVisible}
    >
      <span className="flex items-center justify-center bg-accent rounded-[10px] p-1.5">
        <Icon className="text-muted-foreground" />
      </span>
      <div className="flex flex-col gap-1.5 text-left">
        <Text
          as="span"
          variant="sm"
          weight="medium"
          className="text-foreground max-w-52 w-full truncate sm:max-w-80"
        >
          {title === sectionName ? tc[title] || sectionName : sectionName}
        </Text>
        <Text
          as="span"
          variant="sm"
          weight="normal"
          className="text-muted-foreground max-w-52 w-full truncate sm:max-w-80"
        >
          {tc[description] || description}
        </Text>
      </div>
    </Button>
  );
};

interface EditorSectionReorderProps {
  dragControls?: unknown;
  isVisible: boolean;
  className?: string;
}

export const EditorSectionReorder = ({
  isVisible,
  className,
}: EditorSectionReorderProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2",
        isVisible ? "cursor-grab" : "cursor-not-allowed opacity-35",
        className
      )}
    >
      <GripVertical size={20} className="text-muted-foreground" />
    </div>
  );
};

interface EditorSectionTriggerProps {
  handlePanelClick: () => void;
  isVisible: boolean;
}

export const EditorSectionTrigger = ({
  handlePanelClick,
  isVisible,
}: EditorSectionTriggerProps) => {
  return (
    <Button
      type="button"
      onClick={handlePanelClick}
      variant="ghost"
      size="sm"
      disabled={!isVisible}
      className="absolute right-0 inset-y-0 py-5 pr-4 lg:pr-6 disabled:opacity-35"
    >
      <ChevronRight size={16} className="text-muted-foreground" />
    </Button>
  );
};

interface EditorSectionVisibilityProps {
  section: EditorSection & {
    id: string;
    sectionKey?: string;
    sectionName?: string;
  };
  isVisible: boolean;
}

export const EditorSectionVisibility = ({
  section,
  isVisible,
}: EditorSectionVisibilityProps) => {
  const { updateSectionsVisibility } = useEditor();

  const resumeSection: ResumeSection = {
    id: section.id,
    sectionKey:
      (section as EditorSection & { sectionKey?: string; sectionName?: string })
        .sectionKey || section.id,
    sectionName:
      (section as EditorSection & { sectionKey?: string; sectionName?: string })
        .sectionName || section.title,
    isVisible: isVisible,
    showInSidebar: true,
  };

  return (
    <div className="absolute right-0 inset-y-0 flex items-center gap-2 bg-background-alt border-l border-border z-10">
      <Button
        variant="ghost"
        size="sm"
        className="py-7 px-4 text-muted-foreground"
        onClick={() => updateSectionsVisibility(resumeSection, 0)}
      >
        {isVisible ? <Eye /> : <EyeOff />}
      </Button>
    </div>
  );
};

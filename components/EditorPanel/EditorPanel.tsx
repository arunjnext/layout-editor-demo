"use client";

import { useEditor } from "@/hooks/useEditor";
import { useResume } from "@/hooks/useResume";
import { getResumeTitle } from "@/lib/utils/helpers";
import { editorSections } from "@/lib/utils/resumeConstants";
import { EditorContent } from "./EditorContent";
import { EditorNavigation } from "./EditorNavigation";
import { EditorPanelContainer } from "./EditorPanelContainer";
import { EditorPanelItem } from "./EditorPanelItem";
import { EditorSheet } from "./EditorSheet";
import { EditorTopbar, ResumeTitle } from "./EditorTopbar";
import { ItemGroup } from "@/components/ui/item";

const defaultTranslations = {
  newResume: "New Resume",
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

interface EditorPanelProps {
  translations?: Record<string, string>;
}

export const EditorPanel = ({ translations = {} }: EditorPanelProps) => {
  const { activePanelId, isSheetActive } = useEditor();
  const { resume } = useResume();
  const { name, jobTitle } = resume;
  const tc = { ...defaultTranslations, ...translations };
  const resumeName = getResumeTitle({ name, jobTitle }) || tc.newResume;

  const sectionOrder = resume.design.sections || [];

  const orderedSections = sectionOrder
    .map((sectionItem) => {
      const sectionDetails = editorSections.find(
        (section) => section.id === sectionItem.sectionKey
      );
      return sectionDetails
        ? {
            ...sectionDetails,
            ...sectionItem,
          }
        : null;
    })
    .filter(Boolean) as Array<
    (typeof editorSections)[0] & (typeof sectionOrder)[0]
  >;

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <EditorNavigation translations={tc} />
      <div className="relative flex-auto overflow-y-auto overflow-hidden thin-scrollbar">
        <EditorTopbar>
          {resumeName && <ResumeTitle title={resumeName} />}
        </EditorTopbar>
        <EditorPanelContainer
          className={`${isSheetActive ? "hidden" : "flex"}`}
        >
          <ItemGroup className="relative w-full gap-0">
            {orderedSections.map((section) => {
              return (
                <EditorPanelItem
                  key={section.id}
                  section={section}
                  translations={tc}
                />
              );
            })}
          </ItemGroup>
        </EditorPanelContainer>
        <EditorSheet
          isSheetActive={isSheetActive}
          activePanelId={activePanelId}
        >
          <EditorContent activePanelId={activePanelId} translations={tc} />
        </EditorSheet>
      </div>
    </div>
  );
};

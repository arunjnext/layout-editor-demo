"use client";

import { CustomSection } from "@/components/EditorSections/CustomSection";
import { Education } from "@/components/EditorSections/Education";
import { Experience } from "@/components/EditorSections/Experience";
import { PersonalDetails } from "@/components/EditorSections/PersonalDetails";
import { Proficiencies } from "@/components/EditorSections/Proficiencies";
import { Skills } from "@/components/EditorSections/Skills";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useEditor } from "@/hooks/useEditor";
import { resumeOptionValue } from "@/lib/utils/resumeConstants";
import { useEffect } from "react";

interface Translations {
  [key: string]: string;
}

interface EditorContentProps {
  activePanelId: string | null;
  translations?: Translations;
}

export const EditorContent = ({
  activePanelId,
  translations = {},
}: EditorContentProps) => {
  const { handleBack } = useEditor();
  const commonTranslations = translations;

  // Log warning for invalid activePanelId
  useEffect(() => {
    if (activePanelId) {
      const validSectionIds = [
        resumeOptionValue.personalDetails,
        resumeOptionValue.experience,
        resumeOptionValue.skills,
        resumeOptionValue.education,
        resumeOptionValue.proficiencies,
        resumeOptionValue.customSections,
      ];

      if (!validSectionIds.includes(activePanelId)) {
        console.warn(`Invalid activePanelId encountered: ${activePanelId}`);
      }
    }
  }, [activePanelId]);

  // Handle null activePanelId
  if (!activePanelId) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 p-8">
        <Text
          as="p"
          variant="sm"
          weight="medium"
          className="text-muted-foreground text-center"
        >
          No section selected
        </Text>
        <Button variant="outline" size="sm" onClick={handleBack}>
          Go Back
        </Button>
      </div>
    );
  }

  switch (activePanelId) {
    case resumeOptionValue.personalDetails: {
      return <PersonalDetails translations={commonTranslations} />;
    }
    case resumeOptionValue.experience: {
      return <Experience translations={commonTranslations} />;
    }
    case resumeOptionValue.skills: {
      return <Skills translations={commonTranslations} />;
    }
    case resumeOptionValue.education: {
      return <Education translations={commonTranslations} />;
    }
    case resumeOptionValue.proficiencies: {
      return <Proficiencies translations={commonTranslations} />;
    }
    case resumeOptionValue.customSections: {
      return <CustomSection translations={commonTranslations} />;
    }
    default: {
      // Fallback UI for invalid activePanelId
      return (
        <div className="flex flex-col items-center justify-center h-full gap-4 p-8">
          <Text
            as="p"
            variant="sm"
            weight="medium"
            className="text-muted-foreground text-center"
          >
            Section not found or invalid
          </Text>
          <Text
            as="p"
            variant="xs"
            className="text-muted-foreground text-center"
          >
            The selected section ({activePanelId}) could not be loaded.
          </Text>
          <Button variant="outline" size="sm" onClick={handleBack}>
            Go Back
          </Button>
        </div>
      );
    }
  }
};

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

interface EditorContentProps {
  activePanelId: string | null;
}

export const EditorContent = ({ activePanelId }: EditorContentProps) => {
  const { handleBack } = useEditor();

  // Log warning for invalid activePanelId
  useEffect(() => {
    if (activePanelId) {
      const validSectionIds: string[] = [
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
      <div className="flex flex-col items-center justify-center h-full gap-6 px-6 py-12">
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
      return <PersonalDetails />;
    }
    case resumeOptionValue.experience: {
      return <Experience />;
    }
    case resumeOptionValue.skills: {
      return <Skills />;
    }
    case resumeOptionValue.education: {
      return <Education />;
    }
    case resumeOptionValue.proficiencies: {
      return <Proficiencies />;
    }
    case resumeOptionValue.customSections: {
      return <CustomSection />;
    }
    default: {
      // Fallback UI for invalid activePanelId
      return (
        <div className="flex flex-col items-center justify-center h-full gap-6 px-6 py-12">
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

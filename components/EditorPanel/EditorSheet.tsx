"use client";

import { resumeOptionValue } from "@/lib/utils/resumeConstants";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

interface EditorSheetProps {
  isSheetActive: boolean;
  activePanelId: string | null;
  children: ReactNode;
}

const useMediaQuery = (): boolean => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 0);
  }, []);

  return mounted;
};

export const EditorSheet = ({
  isSheetActive,
  activePanelId,
  children,
}: EditorSheetProps) => {
  // Validate activePanelId before rendering
  const validSectionIds: string[] = [
    resumeOptionValue.personalDetails,
    resumeOptionValue.experience,
    resumeOptionValue.skills,
    resumeOptionValue.education,
    resumeOptionValue.proficiencies,
    resumeOptionValue.customSections,
  ];

  const isValidPanelId =
    activePanelId !== null && validSectionIds.includes(activePanelId);
  const shouldRender = isSheetActive && isValidPanelId;

  if (!shouldRender) {
    return null;
  }

  return (
    <div className="absolute inset-0 flex-auto bg-background overflow-y-auto thin-scrollbar will-change-transform scrollbar-stable p-4 lg:p-6">
      {children}
    </div>
  );
};

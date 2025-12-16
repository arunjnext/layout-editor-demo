"use client";

import { useResume } from "@/hooks/useResume";
import type { Resume, ResumeSection } from "@/lib/utils/defaultResume";
import { resumeOptionValue } from "@/lib/utils/resumeConstants";
import {
  createContext,
  useCallback,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

export interface EditorState {
  activePanelId: string | null;
  isSheetActive: boolean;
  visiblityControls: boolean;
  sectionsVisibility: Record<string | number, boolean>;
  activeTab: string;
}

type EditorAction =
  | { type: "updateState"; payload: Partial<EditorState> }
  | {
      type: "updateSectionsVisibility";
      payload: Record<string | number, boolean>;
    }
  | { type: "setActiveTab"; payload: string };

function reducer(state: EditorState, action: EditorAction): EditorState {
  const { type, payload } = action;

  switch (type) {
    case "updateState": {
      return { ...state, ...payload };
    }
    case "updateSectionsVisibility": {
      return { ...state, sectionsVisibility: payload };
    }
    case "setActiveTab": {
      return { ...state, activeTab: payload };
    }
    default: {
      return state;
    }
  }
}

function createSectionsVisibility(
  sections: ResumeSection[],
  isSheetActive: boolean
): Record<string | number, boolean> {
  return sections.length > 0
    ? sections.reduce((accumulator, section, index) => {
        accumulator[isSheetActive ? index : section.id] = section.isVisible;
        return accumulator;
      }, {} as Record<string | number, boolean>)
    : {};
}

function createInitialState(): EditorState {
  return {
    activePanelId: null,
    isSheetActive: false,
    visiblityControls: false,
    sectionsVisibility: {},
    activeTab: "editor",
  };
}

export interface EditorContextValue extends EditorState {
  editorHandler: React.Dispatch<EditorAction>;
  handlePanelClick: (id: string) => void;
  handleBack: () => void;
  updateSectionsVisibility: (
    section: ResumeSection,
    index: number,
    action?: "update" | "remove"
  ) => void;
  showVisibilityControls: () => void;
  saveItemsVisibility: () => void;
  setActiveTab: (tab: string) => void;
}

export const EditorContext = createContext<EditorContextValue | undefined>(
  undefined
);

interface EditorProviderProps {
  children: ReactNode;
}

export const EditorProvider = ({ children }: EditorProviderProps) => {
  const { resume, updateResume } = useResume();
  const [state, dispatch] = useReducer(reducer, createInitialState());

  const {
    isSheetActive,
    activePanelId,
    sectionsVisibility,
    visiblityControls,
  } = state;
  const { design } = resume;
  const { sections } = design;

  const handlePanelClick = useCallback(
    (id: string) => {
      if (visiblityControls) {
        return;
      }

      // Validate that the id matches a valid resumeOptionValue
      const validSectionIds: string[] = [
        resumeOptionValue.personalDetails,
        resumeOptionValue.experience,
        resumeOptionValue.skills,
        resumeOptionValue.education,
        resumeOptionValue.proficiencies,
        resumeOptionValue.customSections,
      ];

      if (!validSectionIds.includes(id)) {
        console.warn(`Invalid section ID: ${id}. Not opening panel.`);
        return;
      }

      // Verify the section exists in the resume data
      const sectionExists = resume.design.sections.some(
        (section) => section.sectionKey === id
      );

      if (!sectionExists) {
        console.warn(`Section with key ${id} not found in resume data. Not opening panel.`);
        return;
      }

      dispatch({
        type: "updateState",
        payload: {
          activePanelId: id,
          isSheetActive: true,
          visiblityControls: false,
          sectionsVisibility: createSectionsVisibility(
            resume.design.sections,
            false
          ),
        },
      });
    },
    [resume.design.sections, visiblityControls]
  );

  const handleBack = useCallback(() => {
    dispatch({
      type: "updateState",
      payload: {
        isSheetActive: false,
        visiblityControls: false,
      },
    });
  }, []);

  const updateSectionsVisibility = useCallback(
    (
      section: ResumeSection,
      index: number,
      action: "update" | "remove" = "update"
    ) => {
      const key = isSheetActive ? index : section.id;

      let newSectionsVisibility: Record<string | number, boolean> = {};
      if (action === "remove") {
        const entries: Array<[string | number, boolean]> = [];
        Object.entries(sectionsVisibility).forEach(([k, v]) => {
          const numKey = Number(k);
          if (numKey < index) {
            entries.push([k, v]);
          } else if (numKey > index) {
            entries.push([numKey - 1, v]);
          }
        });
        newSectionsVisibility = Object.fromEntries(entries);
      } else {
        newSectionsVisibility = {
          ...state.sectionsVisibility,
          [key]: !sectionsVisibility?.[key] || false,
        };
      }

      dispatch({
        type: "updateSectionsVisibility",
        payload: newSectionsVisibility,
      });
    },
    [dispatch, state.sectionsVisibility, isSheetActive, sectionsVisibility]
  );

  const showVisibilityControls = useCallback(() => {
    const activeInnerSection = activePanelId
      ? (resume as unknown as Record<string, ResumeSection[]>)[activePanelId]
      : undefined;

    const activeSections =
      isSheetActive && activeInnerSection ? activeInnerSection : sections;
    const sectionsVisibility = createSectionsVisibility(
      activeSections,
      isSheetActive
    );

    dispatch({
      type: "updateState",
      payload: {
        visiblityControls: true,
        sectionsVisibility: sectionsVisibility,
      },
    });
  }, [activePanelId, resume, isSheetActive, sections]);

  const saveItemsVisibility = useCallback(() => {
    let payload: Partial<Resume> = {};
    let hasChanges = false;
    if (isSheetActive && activePanelId) {
      const activeInnerSection = (
        resume as unknown as Record<string, ResumeSection[]>
      )[activePanelId];

      if (activeInnerSection) {
        const updatedInnerSections = activeInnerSection.map(
          (section: ResumeSection, index: number) => {
            const newVisibility = sectionsVisibility[index];

            if (section.isVisible !== newVisibility) {
              hasChanges = true;
            }

            return {
              ...section,
              isVisible: newVisibility,
            };
          }
        );

        payload = {
          [activePanelId]: updatedInnerSections,
        } as Partial<Resume>;
      }
    } else {
      const updatedSections = resume.design.sections.map((section) => {
        const newVisibility = sectionsVisibility[section.id];

        if (section.isVisible !== newVisibility) {
          hasChanges = true;
        }

        return {
          ...section,
          isVisible: newVisibility,
        };
      });

      payload = {
        design: {
          ...design,
          sections: updatedSections,
        },
      };
    }
    if (hasChanges) {
      updateResume(payload);
    }
    dispatch({
      type: "updateState",
      payload: { visiblityControls: false },
    });
  }, [
    isSheetActive,
    updateResume,
    resume,
    activePanelId,
    sectionsVisibility,
    design,
  ]);

  const setActiveTab = useCallback((tab: string) => {
    dispatch({
      type: "setActiveTab",
      payload: tab,
    });
  }, []);

  const value = useMemo(
    (): EditorContextValue => ({
      ...state,
      editorHandler: dispatch,
      handlePanelClick,
      handleBack,
      updateSectionsVisibility,
      showVisibilityControls,
      saveItemsVisibility,
      setActiveTab,
    }),
    [
      state,
      dispatch,
      handlePanelClick,
      handleBack,
      updateSectionsVisibility,
      showVisibilityControls,
      saveItemsVisibility,
      setActiveTab,
    ]
  );

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
};

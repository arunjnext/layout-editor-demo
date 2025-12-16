"use client";

import type { Resume } from "@/lib/utils/defaultResume";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export interface ResumeContextValue {
  resume: Resume;
  isGettingResume: boolean;
  getResumeError: Error | null;
  updateResume: (update: Partial<Resume>, source?: string) => void;
  isUpdatingResume: boolean;
  updateResumeError: Error | null;
  undo: () => void;
  redo: () => void;
  undoStack: unknown[];
  redoStack: unknown[];
  isSaving: boolean;
  updateResumeAsync: (
    update: Partial<Resume>,
    source?: string
  ) => Promise<void>;
  templatesDrawerOpen: boolean;
  setTemplatesDrawerOpen: (open: boolean) => void;
}

export const ResumeContext = createContext<ResumeContextValue | undefined>(
  undefined
);

interface ResumeProviderProps {
  children: ReactNode;
  resume: Resume;
  onResumeChange?: (update: Partial<Resume>) => void | Promise<void>;
  debounceMs?: number;
}

export const ResumeProvider = ({
  children,
  resume: initialResume,
  onResumeChange,
  debounceMs = 500,
}: ResumeProviderProps) => {
  const [resume, setResume] = useState<Resume>(initialResume);
  const [isSaving, setIsSaving] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const saveTimer = useRef<NodeJS.Timeout | null>(null);

  // Update local state when prop changes
  useEffect(() => {
    setResume(initialResume);
  }, [initialResume]);

  const updateResume = useCallback(
    (update: Partial<Resume>, source = "") => {
      // Optimistic update
      setResume((previous) => ({ ...previous, ...update }));

      // Clear existing timer
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      if (saveTimer.current) {
        clearTimeout(saveTimer.current);
      }

      // Show saving indicator after delay
      saveTimer.current = setTimeout(() => {
        setIsSaving(true);
      }, 200);

      // Debounce the callback
      debounceTimer.current = setTimeout(() => {
        if (onResumeChange) {
          onResumeChange(update);
        }
        setIsSaving(false);
      }, debounceMs);
    },
    [onResumeChange, debounceMs]
  );

  const updateResumeAsync = useCallback(
    async (update: Partial<Resume>, source = "") => {
      // Optimistic update
      setResume((previous) => ({ ...previous, ...update }));

      // Immediate callback (no debounce)
      if (onResumeChange) {
        await onResumeChange(update);
      }
    },
    [onResumeChange]
  );

  const value = useMemo(
    (): ResumeContextValue => ({
      resume,
      isGettingResume: false,
      getResumeError: null,
      updateResume,
      isUpdatingResume: isSaving,
      updateResumeError: null,
      undo: () => {},
      redo: () => {},
      undoStack: [],
      redoStack: [],
      isSaving,
      updateResumeAsync,
      templatesDrawerOpen: false,
      setTemplatesDrawerOpen: () => {},
    }),
    [resume, updateResume, isSaving, updateResumeAsync]
  );

  return (
    <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
  );
};

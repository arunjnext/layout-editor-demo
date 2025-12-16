"use client";

import { Form } from "@/components/ui/form";
import { useResume } from "@/hooks/useResume";
import { useResumeFormWatch } from "@/hooks/useResumeFormWatch";
import { getResumeFormDefaults } from "@/lib/utils/dataTransformers";
import { unifiedResumeSchema } from "@/lib/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

interface ResumeFormProviderProps {
  children: ReactNode;
}

/**
 * Root form provider that manages the unified resume form
 * - Initializes form with unified schema
 * - Syncs form with resume state (handles undo/redo)
 * - Watches all form changes and updates resume
 */
export const ResumeFormProvider = ({ children }: ResumeFormProviderProps) => {
  const { resume } = useResume();
  const form = useForm({
    resolver: zodResolver(unifiedResumeSchema),
    defaultValues: getResumeFormDefaults(resume),
  });

  // Watch all form changes and update resume
  useResumeFormWatch({ form });

  // Track previous resume to detect external changes (undo/redo)
  const prevResumeRef = useRef(resume);
  const isResettingRef = useRef(false);

  // Sync form when resume changes externally (undo/redo or external updates)
  useEffect(() => {
    // Skip if we're currently resetting (to avoid infinite loops)
    if (isResettingRef.current) {
      isResettingRef.current = false;
      prevResumeRef.current = resume;
      return;
    }

    // Check if resume changed externally (not from form)
    const resumeChanged =
      prevResumeRef.current !== resume &&
      JSON.stringify(prevResumeRef.current) !== JSON.stringify(resume);

    if (resumeChanged) {
      const newDefaults = getResumeFormDefaults(resume);
      isResettingRef.current = true;
      form.reset(newDefaults);
      prevResumeRef.current = resume;
    }
  }, [resume, form]);

  return <Form {...form}>{children}</Form>;
};

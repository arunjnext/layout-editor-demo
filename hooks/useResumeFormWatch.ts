"use client";

import type { Resume } from "@/lib/utils/defaultResume";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { useResume } from "./useResume";

// Form data type that matches Resume structure (excluding id, name, design)
// This ensures type compatibility between form and resume
type ResumeFormData = Omit<Resume, "id" | "name" | "design">;

interface UseResumeFormWatchProps {
  form: UseFormReturn<ResumeFormData>;
}

/**
 * Unified watch hook that watches all form changes and directly updates resume
 * No data transformations - form data matches resume structure exactly
 */
export const useResumeFormWatch = ({ form }: UseResumeFormWatchProps) => {
  const { updateResume } = useResume();
  const { watch } = form;

  useEffect(() => {
    const subscription = watch((data, { name, type }) => {
      if (name && type === "change") {
        // Determine which section changed based on field path
        // Form structure matches Resume structure, so we can update directly
        // Note: data may be partial, so we need to get full form values
        const formValues = form.getValues();
        let update: Partial<Resume> = {};

        

        if (
          name.startsWith("firstName") ||
          name.startsWith("lastName") ||
          name.startsWith("jobTitle") ||
          name.startsWith("summary") ||
          name.startsWith("phone") ||
          name.startsWith("email") ||
          name.startsWith("profileImage") ||
          name.startsWith("showProfileImage") ||
          name.startsWith("links")
        ) {
          // Personal Details section - update all personal detail fields
          update = {
            profileImage: formValues.profileImage,
            showProfileImage: formValues.showProfileImage,
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            jobTitle: formValues.jobTitle,
            summary: formValues.summary,
            phone: formValues.phone,
            email: formValues.email,
            links: formValues.links,
          };
        } else if (name.startsWith("experience")) {
          // Experience section
          update = {
            experience: formValues.experience,
          };
        } else if (name.startsWith("skills")) {
          // Skills section
          update = {
            skills: formValues.skills,
          };
        } else if (name.startsWith("education")) {
          // Education section
          update = {
            education: formValues.education,
          };
        } else if (name.startsWith("proficiencies")) {
          // Proficiencies section
          update = {
            proficiencies: formValues.proficiencies,
          };
        } else if (name.startsWith("customSections")) {
          // Custom Sections
          update = {
            customSections: formValues.customSections,
          };
        }

        // Only update if we have changes
        if (Object.keys(update).length > 0) {
          updateResume(update);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, updateResume, form]);
};


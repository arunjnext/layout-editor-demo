"use client";

import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { useResume } from "./useResume";

interface UseResumeFormWatchProps {
  form: UseFormReturn<any>;
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
        let update: Partial<any> = {};

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
            profileImage: data.profileImage,
            showProfileImage: data.showProfileImage,
            firstName: data.firstName,
            lastName: data.lastName,
            jobTitle: data.jobTitle,
            summary: data.summary,
            phone: data.phone,
            email: data.email,
            links: data.links,
          };
        } else if (name.startsWith("experience")) {
          // Experience section
          update = {
            experience: data.experience,
          };
        } else if (name.startsWith("skills")) {
          // Skills section
          update = {
            skills: data.skills,
          };
        } else if (name.startsWith("education")) {
          // Education section
          update = {
            education: data.education,
          };
        } else if (name.startsWith("proficiencies")) {
          // Proficiencies section
          update = {
            proficiencies: data.proficiencies,
          };
        } else if (name.startsWith("customSections")) {
          // Custom Sections
          update = {
            customSections: data.customSections,
          };
        }

        // Only update if we have changes
        if (Object.keys(update).length > 0) {
          updateResume(update);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, updateResume]);
};


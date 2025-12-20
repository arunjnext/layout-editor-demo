"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useResume } from "@/hooks/useResume";
import {
  generateSampleEducations,
  generateSampleExperiences,
} from "@/lib/utils/sampleDataGenerator";
import { Sparkles, SquarePen } from "lucide-react";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

interface EditorTopbarProps {
  children: ReactNode;
}

export const EditorTopbar = ({ children }: EditorTopbarProps) => {
  return (
    <div className="bg-background border-b border-border flex items-center justify-between px-4 lg:px-6 py-5">
      <div className="flex items-center gap-3">{children}</div>
      <CreateSampleDataButton />
    </div>
  );
};

export const CreateSampleDataButton = () => {
  const { updateResume, resume } = useResume();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateSampleData = useCallback(() => {
    setIsLoading(true);

    // Generate sample data
    const sampleExperiences = generateSampleExperiences(3);
    const sampleEducations = generateSampleEducations(2);

    // Update resume with sample data
    updateResume({
      experience: [...(resume.experience || []), ...sampleExperiences],
      education: [...(resume.education || []), ...sampleEducations],
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [updateResume, resume]);

  return (
    <Button
      type="button"
      onClick={handleCreateSampleData}
      disabled={isLoading}
      variant="outline"
      size="sm"
      className="gap-2"
    >
      <Sparkles size={16} />
      {isLoading ? "Generating..." : "Create Sample Data"}
    </Button>
  );
};

interface ResumeTitleProps {
  title: string;
}

export const ResumeTitle = ({ title }: ResumeTitleProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { updateResume } = useResume();
  const [isEditResumeName, setIsEditResumeName] = useState(false);

  const form = useForm<{ name: string }>({
    defaultValues: {
      name: title,
    },
  });

  const { control, setFocus, handleSubmit, reset } = form;

  const onSubmit = useCallback(
    (data: { name: string }) => {
      updateResume({ name: data.name || "New resume" });
      setIsEditResumeName(false);
    },
    [updateResume]
  );

  useEffect(() => {
    if (!isEditResumeName && title) {
      reset({ name: title });
    }
  }, [title, reset, isEditResumeName]);

  useEffect(() => {
    if (isEditResumeName) {
      setFocus("name");

      const handleClickOutside = (event: MouseEvent) => {
        if (
          formRef.current &&
          !formRef.current.contains(event.target as Node)
        ) {
          handleSubmit(onSubmit)();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isEditResumeName, setFocus, handleSubmit, onSubmit]);

  return (
    <div className="flex items-center gap-1">
      {isEditResumeName ? (
        <Form {...form}>
          <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete="off"
                      className="border-none rounded shadow-none bg-transparent p-0 text-base font-semibold text-foreground disabled:bg-transparent disabled:cursor-default placeholder:text-foreground disabled:text-foreground"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      ) : (
        <button
          type="button"
          className="max-w-40 w-full text-foreground truncate cursor-pointer text-base font-semibold"
          onClick={() => setIsEditResumeName(true)}
        >
          <span className="max-w-40 w-full text-foreground truncate">
            {title}
          </span>
        </button>
      )}
      {!isEditResumeName && (
        <Button
          type="button"
          onClick={() => setIsEditResumeName(true)}
          variant="ghost"
          className="border-none shadow-none p-1"
        >
          <SquarePen size={20} className="text-muted-foreground" />
        </Button>
      )}
    </div>
  );
};

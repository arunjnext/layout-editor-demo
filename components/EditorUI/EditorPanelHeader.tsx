"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useResume } from "@/hooks/useResume";
import { SquarePen } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const defaultTranslations: Record<string, string> = {
  personalDetails: "Personal Details",
  experience: "Experience",
  skills: "Skills",
  education: "Education",
  proficiencies: "Proficiencies",
  customSections: "Custom Sections",
};

interface EditorPanelHeaderProps {
  sectionKey: string;
  description?: string;
  editable?: boolean;
}

export const EditorPanelHeader = ({
  sectionKey,
  description,
  editable = false,
}: EditorPanelHeaderProps) => {
  return (
    <div className="border-b border-border pb-4 mb-6">
      <div className="flex items-center gap-1">
        {editable ? (
          <TitleEditable sectionKey={sectionKey} />
        ) : (
          <Text
            as="span"
            variant="base"
            weight="semibold"
            className="block text-foreground whitespace-nowrap text-ellipsis overflow-hidden"
          >
            {defaultTranslations[sectionKey] || sectionKey}
          </Text>
        )}
      </div>
      {description && (
        <Text
          as="span"
          variant="sm"
          className="block leading-5 text-muted-foreground mt-1"
        >
          {description}
        </Text>
      )}
    </div>
  );
};

interface TitleEditableProps {
  sectionKey: string;
}

const TitleEditable = ({ sectionKey }: TitleEditableProps) => {
  const [isEditSectionTitle, setIsEditSectionTitle] = useState(false);
  const { resume, updateResume } = useResume();
  const { design } = resume;
  const formRef = useRef<HTMLFormElement>(null);

  const initialName =
    design?.sections.find((section) => section.sectionKey === sectionKey)
      ?.sectionName || "";

  const value =
    sectionKey === initialName
      ? defaultTranslations[sectionKey] || sectionKey
      : initialName;

  const form = useForm<{ sectionName: string }>({
    defaultValues: {
      sectionName: value,
    },
  });

  const { control, setFocus, handleSubmit, reset } = form;

  const onSubmit = useCallback(
    (data: { sectionName: string }) => {
      if (
        data.sectionName === defaultTranslations[sectionKey] &&
        data.sectionName === value
      ) {
        reset({ sectionName: value });
        setIsEditSectionTitle(false);
        return;
      }

      if (data.sectionName && data.sectionName.trim() !== initialName.trim()) {
        const updatedSections = resume.design.sections.map((section) => {
          if (section.sectionKey === sectionKey) {
            return { ...section, sectionName: data.sectionName };
          }
          return section;
        });
        updateResume({ design: { ...design, sections: updatedSections } });
      } else {
        reset({ sectionName: value });
      }
      setIsEditSectionTitle(false);
    },
    [initialName, resume.design, sectionKey, design, updateResume, reset, value]
  );

  useEffect(() => {
    if (isEditSectionTitle) {
      setFocus("sectionName");

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
  }, [isEditSectionTitle, setFocus, handleSubmit, onSubmit]);

  return (
    <>
      {isEditSectionTitle ? (
        <Form {...form}>
          <form
            ref={formRef}
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center w-full gap-1.5"
          >
            <FormField
              control={control}
              name="sectionName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete="off"
                      className="border-none rounded-sm shadow-none p-0 text-base font-semibold text-slate-700 disabled:bg-transparent disabled:cursor-default placeholder:text-slate-700 disabled:text-slate-700"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      ) : (
        <Text
          as="span"
          variant="base"
          weight="semibold"
          className="block text-foreground whitespace-nowrap text-ellipsis overflow-hidden"
        >
          {value}
        </Text>
      )}
      {!isEditSectionTitle && (
        <Button
          type="button"
          onClick={() => setIsEditSectionTitle(true)}
          variant="ghost"
          className="border-none shadow-none p-1"
        >
          <SquarePen className="text-muted-foreground" />
        </Button>
      )}
    </>
  );
};

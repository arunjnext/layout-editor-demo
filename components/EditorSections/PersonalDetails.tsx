"use client";

import {
  EditorFieldCheckbox,
  EditorFieldItem,
  EditorFieldLabel,
  EditorFieldRow,
} from "@/components/EditorUI/EditorField";
import { EditorFormBlock } from "@/components/EditorUI/EditorFormBlock";
import { EditorFormFieldGroup } from "@/components/EditorUI/EditorFormFieldGroup";
import { EditorFormTitle } from "@/components/EditorUI/EditorFormTitle";
import { EditorPanelHeader } from "@/components/EditorUI/EditorPanelHeader";
import { ProfileImageController } from "@/components/EditorUI/ProfileImageController";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useCustomUndoRedo } from "@/hooks/useCustomUndoRedo";
import { useFieldRemove } from "@/hooks/useFieldRemove";
import { useFormWatch } from "@/hooks/useFormWatch";
import { useResume } from "@/hooks/useResume";
import { newSocialLink, resumeValues } from "@/lib/utils/dataTransformers";
import { resumeOptionValue } from "@/lib/utils/resumeConstants";
import { personalDetailsSchema } from "@/lib/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

const defaultTranslations = {
  yourDetails: "Your Details",
  addAProfileImage: "Add a Profile Image",
  show: "Show",
  firstName: "First Name",
  lastName: "Last Name",
  desiredJobTitle: "Desired Job Title",
  summary: "Summary",
  contactDetails: "Contact Details",
  phone: "Phone",
  email: "Email",
  links: "Links",
  name: "Name",
  url: "URL",
  addLink: "Add Link",
};

interface PersonalDetailsProps {
  translations?: Record<string, string>;
}

export const PersonalDetails = ({
  translations = {},
}: PersonalDetailsProps) => {
  const tc = { ...defaultTranslations, ...translations };
  const { resume } = useResume();

  const defaultValues = resumeValues.personalDetails(resume);

  const form = useForm({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: defaultValues,
  });

  const { _source } = (resume as unknown as { _source: string }) || {};

  const { register, watch, control, setValue } = form;
  const data = resume?.links || [];

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "links",
  });

  useFormWatch({ watch, key: resumeOptionValue.personalDetails });

  const handleRemove = useFieldRemove({
    remove,
    sectionKey: "links",
    data,
  });

  useEffect(() => {
    if (_source === "undoRedo" && resume) {
      setValue("showProfileImage", resume.showProfileImage);
      setValue("profileImage", resume.profileImage);
      setValue("firstName", resume.firstName);
      setValue("lastName", resume.lastName);
      setValue("jobTitle", resume.jobTitle);
      setValue("summary", resume.summary);
      setValue("phone", resume.phone);
      setValue("email", resume.email);
    }
  }, [_source, resume, setValue]);

  useCustomUndoRedo(
    _source,
    fields,
    "links",
    setValue as (name: string, value: unknown, options?: unknown) => void
  );

  return (
    <>
      <EditorPanelHeader
        editable={false}
        sectionKey={resumeOptionValue.personalDetails}
        description="yourNameSummaryImageAndTitle"
        translations={tc}
      />
      <Form {...form}>
        <form className="space-y-6 divide-y divide-border [&>*:not(:first-child)]:pt-6">
          <EditorFormBlock>
            <EditorFormTitle title={tc.yourDetails} />
            <EditorFieldRow className="gap-6 items-start">
              <div className="flex shrink-0 flex-col gap-3">
                <EditorFieldItem className="gap-0!">
                  <EditorFieldLabel className="sr-only" htmlFor="profileImage">
                    {tc.addAProfileImage}
                  </EditorFieldLabel>
                  <ProfileImageController
                    name="profileImage"
                    control={form.control}
                    profileImageUrl={resume?.profileImage?.url}
                  />
                </EditorFieldItem>
                <EditorFieldItem className="gap-0!">
                  <EditorFieldCheckbox>
                    <Controller
                      name="showProfileImage"
                      control={form.control}
                      render={({ field }) => (
                        <Switch
                          id="showProfileImage"
                          checked={defaultValues.showProfileImage}
                          onCheckedChange={field.onChange}
                          name={field.name}
                          ref={field.ref}
                        />
                      )}
                    />
                    <EditorFieldLabel htmlFor="showProfileImage">
                      {tc.show}
                    </EditorFieldLabel>
                  </EditorFieldCheckbox>
                </EditorFieldItem>
              </div>
              <EditorFormFieldGroup className="flex-1">
                <EditorFieldRow className="flex-row">
                  <EditorFieldItem className="flex-1">
                    <EditorFieldLabel htmlFor="firstName">
                      {tc.firstName}
                    </EditorFieldLabel>
                    <Input
                      type="text"
                      placeholder={tc.firstName}
                      {...register(`firstName`)}
                    />
                  </EditorFieldItem>
                  <EditorFieldItem className="flex-1">
                    <EditorFieldLabel htmlFor="lastName">
                      {tc.lastName}
                    </EditorFieldLabel>
                    <Input
                      type="text"
                      placeholder={tc.lastName}
                      {...register(`lastName`)}
                    />
                  </EditorFieldItem>
                </EditorFieldRow>
                <EditorFieldRow>
                  <EditorFieldItem>
                    <EditorFieldLabel htmlFor="jobTitle">
                      {tc.desiredJobTitle}
                    </EditorFieldLabel>
                    <Input
                      type="text"
                      placeholder={tc.desiredJobTitle}
                      {...register(`jobTitle`)}
                    />
                  </EditorFieldItem>
                </EditorFieldRow>
              </EditorFormFieldGroup>
            </EditorFieldRow>
          </EditorFormBlock>
          <EditorFormBlock>
            <EditorFormTitle title={tc.summary} />
            <EditorFormFieldGroup>
              <EditorFieldRow>
                <EditorFieldItem>
                  <EditorFieldLabel className="sr-only" htmlFor="summary">
                    {tc.summary}
                  </EditorFieldLabel>
                  <Textarea
                    id="summary"
                    placeholder={tc.summary}
                    {...register("summary")}
                    rows={6}
                  />
                </EditorFieldItem>
              </EditorFieldRow>
            </EditorFormFieldGroup>
          </EditorFormBlock>
          <EditorFormBlock>
            <EditorFormTitle title={tc.contactDetails} />
            <EditorFormFieldGroup>
              <EditorFieldRow className="flex-row">
                <EditorFieldItem className="flex-1">
                  <EditorFieldLabel htmlFor="phone">
                    {tc.phone}
                  </EditorFieldLabel>
                  <Input
                    type="text"
                    placeholder={tc.phone}
                    {...register(`phone`)}
                  />
                </EditorFieldItem>
                <EditorFieldItem className="flex-1">
                  <EditorFieldLabel htmlFor="email">
                    {tc.email}
                  </EditorFieldLabel>
                  <Input
                    type="text"
                    placeholder={tc.email}
                    {...register(`email`)}
                  />
                </EditorFieldItem>
              </EditorFieldRow>
            </EditorFormFieldGroup>
          </EditorFormBlock>
          <EditorFormBlock>
            <EditorFormTitle title={tc.links} />
            <EditorFormFieldGroup>
              {fields.map((field, index) => (
                <div key={field.id}>
                  <EditorFieldRow className="flex-row items-end gap-2">
                    <EditorFieldItem className="flex-1">
                      <EditorFieldLabel htmlFor={`links.${index}.name`}>
                        {tc.name}
                      </EditorFieldLabel>
                      <Input
                        type="text"
                        placeholder={tc.name}
                        {...register(`links.${index}.name`)}
                      />
                    </EditorFieldItem>
                    <EditorFieldItem className="flex-1">
                      <EditorFieldLabel htmlFor={`links.${index}.url`}>
                        {tc.url}
                      </EditorFieldLabel>
                      <Input
                        type="url"
                        placeholder={tc.url}
                        {...register(`links.${index}.url`)}
                      />
                    </EditorFieldItem>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemove(index)}
                      className="shrink-0 h-10 w-10"
                    >
                      <X size={16} />
                    </Button>
                  </EditorFieldRow>
                </div>
              ))}
            </EditorFormFieldGroup>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => append(newSocialLink)}
              className="mt-3"
            >
              {tc.addLink}
              <Plus size={16} />
            </Button>
          </EditorFormBlock>
        </form>
      </Form>
    </>
  );
};

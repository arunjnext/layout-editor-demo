"use client";

import {
  EditorFieldItem,
  EditorFieldLabel,
  EditorFieldRow,
} from "@/components/EditorUI/EditorField";
import { EditorFormBlock } from "@/components/EditorUI/EditorFormBlock";
import { EditorFormFieldGroup } from "@/components/EditorUI/EditorFormFieldGroup";
import { EditorFormTitle } from "@/components/EditorUI/EditorFormTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
} from "@/components/ui/item";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useFieldRemove } from "@/hooks/useFieldRemove";
import { useResume } from "@/hooks/useResume";
import { newSocialLink } from "@/lib/utils/dataTransformers";
import {
  Github,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Plus,
  Trash,
  Twitter,
  Youtube,
} from "lucide-react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import AvatarUpload from "../file-upload/avatar-upload";

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
  socialProfiles: "Social Profiles",
  selectProvider: "Select Provider",
  url: "URL",
  addSocialProfile: "Add Social Profile",
};

type SocialProvider = {
  value: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

const socialProviders: SocialProvider[] = [
  { value: "linkedin", label: "LinkedIn", icon: Linkedin },
  { value: "twitter", label: "Twitter", icon: Twitter },
  { value: "github", label: "GitHub", icon: Github },
  { value: "instagram", label: "Instagram", icon: Instagram },
  { value: "youtube", label: "YouTube", icon: Youtube },
  { value: "website", label: "Website", icon: Globe },
];

type PersonalDetailsVariant =
  | "with-profile"
  | "with-contact"
  | "minimal"
  | "card";

interface PersonalDetailsProps {
  variant?: PersonalDetailsVariant;
}

export const PersonalDetails = ({ variant = "card" }: PersonalDetailsProps) => {
  const { resume } = useResume();
  const { control, register, watch, setValue } = useFormContext();

  const data = resume?.links || [];

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  const handleRemove = useFieldRemove({
    remove,
    sectionKey: "links",
    data,
  });

  // Determine which sections to show based on variant
  const showProfileImage = variant === "with-profile";
  const showContactDetails = variant === "with-contact" || variant === "card";
  const showLinks =
    variant === "with-contact" || variant === "minimal" || variant === "card";
  const useCardWrapper = variant === "card";

  // Basic fields section (always shown)
  const basicFieldsSection = (
    <EditorFormBlock>
      {showProfileImage && (
        <EditorFormBlock>
          <AvatarUpload />
        </EditorFormBlock>
      )}
      <EditorFormFieldGroup>
        <EditorFieldRow className="flex-row">
          <EditorFieldItem className="flex-1">
            <EditorFieldLabel htmlFor="firstName">
              {defaultTranslations.firstName}
            </EditorFieldLabel>
            <Input
              type="text"
              placeholder={defaultTranslations.firstName}
              {...register(`firstName`)}
            />
          </EditorFieldItem>
          <EditorFieldItem className="flex-1">
            <EditorFieldLabel htmlFor="lastName">
              {defaultTranslations.lastName}
            </EditorFieldLabel>
            <Input
              type="text"
              placeholder={defaultTranslations.lastName}
              {...register(`lastName`)}
            />
          </EditorFieldItem>
        </EditorFieldRow>
        <EditorFieldRow>
          <EditorFieldItem>
            <EditorFieldLabel htmlFor="jobTitle">
              {defaultTranslations.desiredJobTitle}
            </EditorFieldLabel>
            <Input
              type="text"
              placeholder={defaultTranslations.desiredJobTitle}
              {...register(`jobTitle`)}
            />
          </EditorFieldItem>
        </EditorFieldRow>
      </EditorFormFieldGroup>
    </EditorFormBlock>
  );

  // Summary section (always shown)
  const summarySection = (
    <EditorFormBlock>
      <EditorFormTitle title={defaultTranslations.summary} />
      <EditorFormFieldGroup>
        <EditorFieldRow>
          <EditorFieldItem>
            <EditorFieldLabel className="sr-only" htmlFor="summary">
              {defaultTranslations.summary}
            </EditorFieldLabel>
            <Textarea
              id="summary"
              placeholder={defaultTranslations.summary}
              {...register("summary")}
              rows={6}
            />
          </EditorFieldItem>
        </EditorFieldRow>
      </EditorFormFieldGroup>
    </EditorFormBlock>
  );

  // Contact details section
  const contactDetailsSection = showContactDetails ? (
    <EditorFormBlock>
      <EditorFormTitle title={defaultTranslations.contactDetails} />
      <EditorFormFieldGroup>
        <EditorFieldRow className="flex-row">
          <EditorFieldItem className="flex-1">
            <EditorFieldLabel htmlFor="phone">
              {defaultTranslations.phone}
            </EditorFieldLabel>
            <InputGroup>
              <InputGroupInput
                type="text"
                placeholder={defaultTranslations.phone}
                {...register(`phone`)}
              />
              <InputGroupAddon>
                <Phone />
              </InputGroupAddon>
            </InputGroup>
          </EditorFieldItem>
          <EditorFieldItem className="flex-1">
            <EditorFieldLabel htmlFor="email">
              {defaultTranslations.email}
            </EditorFieldLabel>
            <InputGroup>
              <InputGroupInput
                type="text"
                placeholder={defaultTranslations.email}
                {...register(`email`)}
              />
              <InputGroupAddon>
                <Mail />
              </InputGroupAddon>
            </InputGroup>
          </EditorFieldItem>
        </EditorFieldRow>
      </EditorFormFieldGroup>
    </EditorFormBlock>
  ) : null;

  // Social Profiles section
  const linksSection = showLinks ? (
    <EditorFormBlock>
      <EditorFormTitle title={defaultTranslations.socialProfiles} />
      <ItemGroup>
        {fields.map((field, index) => {
          const providerValue = watch(`links.${index}.provider`) || "";
          const selectedProvider = socialProviders.find(
            (p) => p.value === providerValue
          );
          const ProviderIcon = selectedProvider?.icon || Globe;

          return (
            <Item
              key={field.id}
              variant="outline"
              className="border border-dashed"
            >
              <ItemContent className="flex-1 gap-3 flex-row">
                <div className="flex flex-col gap-2 flex-1">
                  <Controller
                    name={`links.${index}.provider`}
                    control={control}
                    render={({ field: providerField }) => (
                      <Select
                        value={providerField.value || ""}
                        onValueChange={(value) => {
                          providerField.onChange(value);
                          // Update name field when provider changes
                          const provider = socialProviders.find(
                            (p) => p.value === value
                          );
                          if (provider) {
                            setValue(`links.${index}.name`, provider.label);
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue>
                            {selectedProvider ? (
                              <div className="flex items-center gap-2">
                                <ProviderIcon size={16} />
                                <span>{selectedProvider.label}</span>
                              </div>
                            ) : (
                              <span className="text-muted-foreground">
                                {defaultTranslations.selectProvider}
                              </span>
                            )}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {socialProviders.map((provider) => {
                            const Icon = provider.icon;
                            return (
                              <SelectItem
                                key={provider.value}
                                value={provider.value}
                              >
                                <div className="flex items-center gap-2">
                                  <Icon size={16} />
                                  <span>{provider.label}</span>
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <InputGroup>
                    <InputGroupInput
                      type="url"
                      placeholder={defaultTranslations.url}
                      {...register(`links.${index}.url`)}
                    />
                    <InputGroupAddon>
                      <ProviderIcon size={16} />
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              </ItemContent>
              <ItemActions>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => handleRemove(index)}
                  className="h-8 w-8"
                >
                  <Trash size={16} />
                </Button>
              </ItemActions>
            </Item>
          );
        })}
      </ItemGroup>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append(newSocialLink)}
        className="mt-3"
      >
        {defaultTranslations.addSocialProfile}
        <Plus size={16} />
      </Button>
    </EditorFormBlock>
  ) : null;

  // Form content
  const formContent = (
    <form className="space-y-6">
      {basicFieldsSection}
      {summarySection}
      {contactDetailsSection}
      {linksSection}
    </form>
  );

  return (
    <>
      {useCardWrapper ? (
        <Card className="ring-0 border border-dashed">
          <CardContent className="pt-6 border-none">{formContent}</CardContent>
        </Card>
      ) : (
        formContent
      )}
    </>
  );
};

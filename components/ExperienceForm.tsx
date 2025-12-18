import { Briefcase, Plus, Trash } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { DatePicker } from "./date-picker";
import {
  EditorFieldItem,
  EditorFieldLabel,
  EditorFieldRow,
} from "./EditorUI/EditorField";
import { EditorFormFieldGroup } from "./EditorUI/EditorFormFieldGroup";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Item, ItemContent } from "./ui/item";
import { Textarea } from "./ui/textarea";

interface ExperienceFormProps {
  index: number;
  onRemove: () => void;
}

export function ExperienceForm({ index, onRemove }: ExperienceFormProps) {
  const { register, control, watch } = useFormContext();

  // Watch specific experience fields using index
  const title = watch(`experience.${index}.title`) || "";
  const company = watch(`experience.${index}.company`) || "";

  return (
    <Item variant="outline" className="border border-dashed">
      <ItemContent className="flex-1 gap-4 flex-col">
        {/* Header */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Briefcase size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium">
              {title || "New Experience"}
              {company && ` @ ${company}`}
            </span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onRemove}
            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
            aria-label="Remove experience"
          >
            <Trash size={16} />
          </Button>
        </div>

        {/* Form Fields */}
        <EditorFormFieldGroup>
          {/* Job Title & Company */}
          <EditorFieldRow className="flex-row">
            <EditorFieldItem className="flex-1">
              <EditorFieldLabel htmlFor={`experience.${index}.title`}>
                Job Title <span className="text-destructive">*</span>
              </EditorFieldLabel>
              <Input
                id={`experience.${index}.title`}
                {...register(`experience.${index}.title`)}
                placeholder="e.g. Senior Software Engineer"
              />
            </EditorFieldItem>

            <EditorFieldItem className="flex-1">
              <EditorFieldLabel htmlFor={`experience.${index}.company`}>
                Company <span className="text-destructive">*</span>
              </EditorFieldLabel>
              <Input
                id={`experience.${index}.company`}
                {...register(`experience.${index}.company`)}
                placeholder="e.g. Tech Innovations Inc."
              />
            </EditorFieldItem>
          </EditorFieldRow>

          {/* Start Date & End Date */}
          <EditorFieldRow className="flex-row">
            <EditorFieldItem className="flex-1">
              <EditorFieldLabel htmlFor={`experience.${index}.startDate`}>
                Start Date <span className="text-destructive">*</span>
              </EditorFieldLabel>
              <Controller
                name={`experience.${index}.startDate`}
                control={control}
                render={({ field }) => (
                  <DatePicker
                    id={`experience.${index}.startDate`}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select start date"
                  />
                )}
              />
            </EditorFieldItem>

            <EditorFieldItem className="flex-1">
              <EditorFieldLabel htmlFor={`experience.${index}.endDate`}>
                End Date <span className="text-destructive">*</span>
              </EditorFieldLabel>
              <Controller
                name={`experience.${index}.endDate`}
                control={control}
                render={({ field }) => (
                  <DatePicker
                    id={`experience.${index}.endDate`}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select end date"
                  />
                )}
              />
            </EditorFieldItem>
          </EditorFieldRow>

          {/* Introduction */}
          <EditorFieldRow>
            <EditorFieldItem>
              <EditorFieldLabel htmlFor={`experience.${index}.intro`}>
                Introduction <span className="text-destructive">*</span>
              </EditorFieldLabel>
              <Textarea
                id={`experience.${index}.intro`}
                {...register(`experience.${index}.intro`)}
                placeholder="Brief summary of your role and key responsibilities..."
                rows={3}
              />
            </EditorFieldItem>
          </EditorFieldRow>

          {/* Key Achievements */}
          <EditorFieldRow>
            <EditorFieldItem>
              <EditorFieldLabel>
                Key Achievements{" "}
                <span className="text-muted-foreground italic font-normal text-xs">
                  (optional)
                </span>
              </EditorFieldLabel>
              <Controller
                name={`experience.${index}.description`}
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    {Array.isArray(field.value) &&
                      field.value.map((_, achIndex) => (
                        <div key={achIndex} className="flex gap-2 items-start">
                          <Textarea
                            {...register(
                              `experience.${index}.description.${achIndex}`
                            )}
                            placeholder={`Achievement ${achIndex + 1}...`}
                            rows={2}
                            className="flex-1 resize-none"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => {
                              const newDesc = [...field.value];
                              newDesc.splice(achIndex, 1);
                              field.onChange(newDesc);
                            }}
                            aria-label="Remove achievement"
                            className="shrink-0 h-10 w-10"
                          >
                            <Trash size={16} />
                          </Button>
                        </div>
                      ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        field.onChange([...(field.value || []), ""])
                      }
                      className="w-full border-dashed border-2"
                    >
                      <Plus size={16} />
                      Add Achievement
                    </Button>
                  </div>
                )}
              />
            </EditorFieldItem>
          </EditorFieldRow>
        </EditorFormFieldGroup>
      </ItemContent>
    </Item>
  );
}

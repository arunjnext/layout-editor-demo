import { GraduationCap, Trash } from "lucide-react";
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

interface EducationFormProps {
  index: number;
  onRemove: () => void;
}

export function EducationForm({ index, onRemove }: EducationFormProps) {
  const { register, control, watch } = useFormContext();

  // Watch specific education fields using index
  const degree = watch(`education.${index}.title`) || "";
  const institution = watch(`education.${index}.subTitle`) || "";

  return (
    <Item variant="outline" className="border border-dashed">
      <ItemContent className="flex-1 gap-4 flex-col">
        {/* Header */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <GraduationCap size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium">
              {degree || "New Education"}
              {institution && ` @ ${institution}`}
            </span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onRemove}
            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
            aria-label="Remove education"
          >
            <Trash size={16} />
          </Button>
        </div>

        {/* Form Fields */}
        <EditorFormFieldGroup>
          {/* Degree & Institution */}
          <EditorFieldRow className="flex-row">
            <EditorFieldItem className="flex-1">
              <EditorFieldLabel htmlFor={`education.${index}.title`}>
                Degree <span className="text-destructive">*</span>
              </EditorFieldLabel>
              <Input
                id={`education.${index}.title`}
                {...register(`education.${index}.title`)}
                placeholder="e.g. Bachelor of Science in Computer Science"
              />
            </EditorFieldItem>

            <EditorFieldItem className="flex-1">
              <EditorFieldLabel htmlFor={`education.${index}.subTitle`}>
                Institution <span className="text-destructive">*</span>
              </EditorFieldLabel>
              <Input
                id={`education.${index}.subTitle`}
                {...register(`education.${index}.subTitle`)}
                placeholder="e.g. Massachusetts Institute of Technology"
              />
            </EditorFieldItem>
          </EditorFieldRow>

          {/* Start Date & End Date */}
          <EditorFieldRow className="flex-row">
            <EditorFieldItem className="flex-1">
              <EditorFieldLabel htmlFor={`education.${index}.startDate`}>
                Start Date <span className="text-destructive">*</span>
              </EditorFieldLabel>
              <Controller
                name={`education.${index}.startDate`}
                control={control}
                render={({ field }) => (
                  <DatePicker
                    id={`education.${index}.startDate`}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select start date"
                  />
                )}
              />
            </EditorFieldItem>

            <EditorFieldItem className="flex-1">
              <EditorFieldLabel htmlFor={`education.${index}.endDate`}>
                End Date <span className="text-destructive">*</span>
              </EditorFieldLabel>
              <Controller
                name={`education.${index}.endDate`}
                control={control}
                render={({ field }) => (
                  <DatePicker
                    id={`education.${index}.endDate`}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select end date or Present"
                  />
                )}
              />
            </EditorFieldItem>
          </EditorFieldRow>

          {/* Description */}
          <EditorFieldRow>
            <EditorFieldItem>
              <EditorFieldLabel htmlFor={`education.${index}.description`}>
                Description{" "}
                <span className="text-muted-foreground italic font-normal text-xs">
                  (optional)
                </span>
              </EditorFieldLabel>
              <Textarea
                id={`education.${index}.description`}
                {...register(`education.${index}.description`)}
                placeholder="GPA, honors, relevant coursework, activities..."
                rows={3}
              />
            </EditorFieldItem>
          </EditorFieldRow>
        </EditorFormFieldGroup>
      </ItemContent>
    </Item>
  );
}


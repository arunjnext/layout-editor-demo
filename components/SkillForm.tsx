import { Tag, Trash } from "lucide-react";
import { useFormContext } from "react-hook-form";
import {
  EditorFieldItem,
  EditorFieldLabel,
  EditorFieldRow,
} from "./EditorUI/EditorField";
import { EditorFormFieldGroup } from "./EditorUI/EditorFormFieldGroup";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Item, ItemContent } from "./ui/item";

interface SkillFormProps {
  index: number;
  onRemove: () => void;
}

export function SkillForm({ index, onRemove }: SkillFormProps) {
  const { register, watch } = useFormContext();

  // Watch specific skill fields using index
  const skillName = watch(`skills.${index}.name`) || "";
  const category = watch(`skills.${index}.category`) || "";

  return (
    <Item variant="outline" className="border border-dashed">
      <ItemContent className="flex-1 gap-4 flex-col">
        {/* Header */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Tag size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium">
              {skillName || "New Skill"}
              {category && ` (${category})`}
            </span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onRemove}
            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
            aria-label="Remove skill"
          >
            <Trash size={16} />
          </Button>
        </div>

        {/* Form Fields */}
        <EditorFormFieldGroup>
          {/* Skill Name & Category */}
          <EditorFieldRow className="flex-row">
            <EditorFieldItem className="flex-1">
              <EditorFieldLabel htmlFor={`skills.${index}.name`}>
                Skill Name <span className="text-destructive">*</span>
              </EditorFieldLabel>
              <Input
                id={`skills.${index}.name`}
                {...register(`skills.${index}.name`)}
                placeholder="e.g. JavaScript, React, Python"
              />
            </EditorFieldItem>

            <EditorFieldItem className="flex-1">
              <EditorFieldLabel htmlFor={`skills.${index}.category`}>
                Category{" "}
                <span className="text-muted-foreground italic font-normal text-xs">
                  (optional)
                </span>
              </EditorFieldLabel>
              <Input
                id={`skills.${index}.category`}
                {...register(`skills.${index}.category`)}
                placeholder="e.g. Programming, Design, Languages"
              />
            </EditorFieldItem>
          </EditorFieldRow>
        </EditorFormFieldGroup>
      </ItemContent>
    </Item>
  );
}


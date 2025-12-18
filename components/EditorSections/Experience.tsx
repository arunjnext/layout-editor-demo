import { Plus } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { Position } from "resume-layout-engine";
import { ExperienceForm } from "../ExperienceForm";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ItemGroup } from "../ui/item";

export const Experience = () => {
  const { control, watch } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  // Watch the experience array and sync to context
  const watchedExperience = watch("experience") as Position[];

  console.log(watchedExperience, "watchedExperience");

  const handleAddExperience = () => {
    const newExperience: Position = {
      _id: crypto.randomUUID(),
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      intro: "",
      description: [],
    };

    append(newExperience);
  };

  const validExperiencesCount = (watchedExperience || []).filter(
    (exp: Position) =>
      exp?.title?.trim() &&
      exp?.company?.trim() &&
      exp?.startDate?.trim() &&
      exp?.endDate?.trim() &&
      exp?.intro?.trim()
  ).length;

  return (
    <Card className="ring-0 border border-dashed">
      <CardContent className="pt-6 border-none">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold flex items-center gap-3">
                Work Experience
                <Badge variant="secondary" className="text-sm font-semibold">
                  {validExperiencesCount} of {fields.length} complete
                </Badge>
              </h2>
              <p className="text-sm text-muted-foreground">
                Add and manage your work experiences
              </p>
            </div>
          </div>

          {/* Experience List */}
          <ItemGroup>
            {fields.map((field, index) => (
              <ExperienceForm
                key={field.id}
                index={index}
                onRemove={() => remove(index)}
              />
            ))}
          </ItemGroup>

          {/* Add Button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddExperience}
            className="w-full"
          >
            <Plus size={16} />
            Add Experience
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

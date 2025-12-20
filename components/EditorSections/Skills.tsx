import { resumeOptionValue } from "@/lib/utils/resumeConstants";
import { Plus } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { Skill } from "resume-layout-engine";
import { EditorPanelHeader } from "../EditorUI/EditorPanelHeader";
import { EmptySkills } from "../Empty/EmptySkills";
import { SkillForm } from "../SkillForm";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ItemGroup } from "../ui/item";

export const Skills = () => {
  // Access centralized form context
  const { control, watch } = useFormContext();

  // Setup field array for dynamic skill entries
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills", // Must match the key in unifiedResumeSchema
  });

  // Watch skills array for debugging/preview
  const watchedSkills = watch("skills") as Skill[];

  console.log(watchedSkills, "watchedSkills");

  // Handler to add new skill entry
  const handleAddSkill = () => {
    const newSkill: Skill = {
      _id: crypto.randomUUID(),
      name: "",
      category: "",
    };

    append(newSkill);
  };

  const handleAddSampleSkill = () => {
    const newSkill: Skill = {
      _id: crypto.randomUUID(),
      name: "JavaScript",
      category: "Programming Languages",
    };

    append(newSkill);
  };

  return (
    <Card className="ring-0 border border-dashed">
      <CardContent className="border-none">
        <div className="space-y-6">
          {/* Header */}
          <EditorPanelHeader
            sectionKey={resumeOptionValue.skills}
            description="Key areas that illustrate your strengths"
          />

          {/* Empty State */}
          {fields.length === 0 && <EmptySkills />}

          {/* Skills List */}
          <ItemGroup>
            {fields.map((field, index) => (
              <SkillForm
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
            onClick={handleAddSkill}
            className="w-full"
          >
            <Plus size={16} />
            Add Skill
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddSampleSkill}
            className="w-full"
          >
            <Plus size={16} />
            Add Sample Skill
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

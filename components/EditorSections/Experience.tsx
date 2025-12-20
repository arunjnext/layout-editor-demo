import { resumeOptionValue } from "@/lib/utils/resumeConstants";
import { Plus } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { Position } from "resume-layout-engine";
import { EditorPanelHeader } from "../EditorUI/EditorPanelHeader";
import { EmptyExperience } from "../Empty/EmptyExperience";
import { ExperienceForm } from "../ExperienceForm";
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

  const handleAddSampleExperience = () => {
    const newExperience: Position = {
      _id: crypto.randomUUID(),
      title: "Software Engineer",
      company: "Google",
      description: [
        "Developed and maintained web applications using React, Node.js, and MongoDB.",
        "Collaborated with cross-functional teams to deliver high-quality software solutions.",
      ],
    };

    append(newExperience);
  };
  return (
    <Card className="ring-0 border border-dashed">
      <CardContent className="border-none">
        <div className="space-y-6">
          {/* Header */}
          <EditorPanelHeader
            sectionKey={resumeOptionValue.experience}
            description="Your work history and achievements"
          />
          {fields.length === 0 && <EmptyExperience />}

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
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddSampleExperience}
            className="w-full"
          >
            Add Sample Experience
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

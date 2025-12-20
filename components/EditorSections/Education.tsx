import { resumeOptionValue } from "@/lib/utils/resumeConstants";
import { Plus } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { EditorPanelHeader } from "../EditorUI/EditorPanelHeader";
import { EducationForm } from "../EducationForm";
import { EmptyEducation } from "../Empty/EmptyEducation";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ItemGroup } from "../ui/item";

export const Education = () => {
  // Access centralized form context
  const { control, watch } = useFormContext();

  // Setup field array for dynamic education entries
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education", // Must match the key in unifiedResumeSchema
  });

  // Watch education array for debugging/preview
  const watchedEducation = watch("education");

  console.log(watchedEducation, "watchedEducation");

  // Handler to add new education entry
  const handleAddEducation = () => {
    const newEducation = {
      id: crypto.randomUUID(),
      title: "", // Degree
      subTitle: "", // Institution
      description: "", // Additional details
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      isPresent: false,
      showDate: true,
      isVisible: true,
    };

    append(newEducation);
  };

  const handleAddSampleEducation = () => {
    const newEducation = {
      id: crypto.randomUUID(),
      title: "Bachelor of Science in Computer Science",
      subTitle: "University of California, Los Angeles",
    };

    append(newEducation);
  };

  return (
    <Card className="ring-0 border border-dashed">
      <CardContent className="border-none">
        <div className="space-y-6">
          {/* Header */}
          <EditorPanelHeader
            sectionKey={resumeOptionValue.education}
            description="Where you studied and your qualifications"
          />

          {/* Empty State */}
          {fields.length === 0 && <EmptyEducation />}

          {/* Education List */}
          <ItemGroup>
            {fields.map((field, index) => (
              <EducationForm
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
            onClick={handleAddEducation}
            className="w-full"
          >
            <Plus size={16} />
            Add Education
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddSampleEducation}
            className="w-full"
          >
            <Plus size={16} />
            Add Sample Education
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

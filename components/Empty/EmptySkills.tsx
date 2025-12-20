import { Tag } from "lucide-react";

export const EmptySkills = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed rounded-lg bg-muted/20">
      <Tag className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">No skills added yet</h3>
      <p className="text-sm text-muted-foreground max-w-sm">
        Add your technical skills, languages, tools, and other competencies to
        showcase your expertise.
      </p>
    </div>
  );
};


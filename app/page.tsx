"use client";

import { EditorPanel } from "@/components/EditorPanel/EditorPanel";
import { ResumePreview } from "@/components/ResumePreview/ResumePreview";
import { EditorProvider } from "@/context/EditorProvider";
import { ResumeProvider } from "@/context/ResumeProvider";
import { createDefaultResume } from "@/lib/utils/defaultResume";

export default function Page() {
  const defaultResume = createDefaultResume();

  return (
    <ResumeProvider resume={defaultResume}>
      <EditorProvider>
        <div className="h-screen w-full flex overflow-hidden">
          {/* Left column: Resume Preview */}
          <div className="flex-1 h-full overflow-hidden border-r border-border">
            <ResumePreview />
          </div>

          {/* Right column: Editor Panel */}
          <div className="flex-1 h-full overflow-hidden bg-background">
            <EditorPanel />
          </div>
        </div>
      </EditorProvider>
    </ResumeProvider>
  );
}

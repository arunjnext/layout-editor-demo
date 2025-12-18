"use client";

import { EditorPanel } from "@/components/EditorPanel/EditorPanel";
import { ResumeFormProvider } from "@/components/ResumeFormProvider";
import { ResumePreview } from "@/components/ResumePreview/ResumePreview";
import { EditorProvider } from "@/context/EditorProvider";
import { ResumeProvider } from "@/context/ResumeProvider";
import { createDefaultResume } from "@/lib/utils/defaultResume";

export default function Page() {
  const defaultResume = createDefaultResume();

  return (
    <ResumeProvider resume={defaultResume}>
      <ResumeFormProvider>
        <EditorProvider>
          <div className="h-screen w-full flex overflow-hidden">
            {/* Left column: Resume Preview - Hidden on mobile and tablet */}
            <div className="hidden lg:flex flex-1 h-full overflow-y-auto border-r border-border bg-gray-50">
              <div className="w-full p-6">
                <ResumePreview />
              </div>
            </div>

            {/* Right column: Editor Panel - Full width on mobile/tablet */}
            <div className="flex-1 h-full lg:max-w-2xl overflow-y-auto bg-background">
              <EditorPanel />
            </div>
          </div>
        </EditorProvider>
      </ResumeFormProvider>
    </ResumeProvider>
  );
}

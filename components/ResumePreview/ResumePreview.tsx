"use client";

export const ResumePreview = () => {
  return (
    <div className="h-full w-full flex items-start justify-center bg-[#f5f5f5] bg-[radial-gradient(circle,_#d3d3d3_1px,_transparent_1px)] bg-[length:20px_20px] p-4 lg:p-8 overflow-y-auto">
      <div className="w-full max-w-[210mm] min-h-[297mm] bg-white shadow-lg relative">
        {/* Thin dark line at the top */}
        <div className="w-full h-1 bg-red-800 absolute top-0 left-0 z-10" />
        
        {/* Placeholder content */}
        <div className="flex flex-col items-center justify-center min-h-[297mm] p-8 text-muted-foreground">
          <p className="text-sm">Resume Preview</p>
          <p className="text-xs mt-2 opacity-60">Your resume will appear here</p>
        </div>
      </div>
    </div>
  );
};


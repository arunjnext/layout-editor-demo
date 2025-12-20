import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useResumeLayout } from "@/hooks/useResumeLayout";
import { Resume } from "@/lib/utils/defaultResume";
import { EducationItem } from "@/lib/utils/types";
import { Columns2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import type { Position, Skill } from "resume-layout-engine";

/**
 * React component for resume preview with automatic page splitting
 *
 * @example
 * ```tsx
 * function App() {
 *   const experiences = [
 *     {
 *       _id: 'work-1',
 *       title: 'Software Engineer',
 *       company: 'Tech Corp',
 *       description: ['Built APIs', 'Led team']
 *     }
 *   ];
 *
 *   return <ResumePreview experiences={experiences} />;
 * }
 * ```
 */
export function ResumePreview() {
  const { control } = useFormContext();
  const [columnCount, setColumnCount] = useState<1 | 2>(2);

  // Watch the entire form for any changes
  const formData = useWatch({
    control,
    defaultValue: {
      experience: [],
      education: [],
    },
  });

  const { containerRef, engine, isReady, pageCount, remainingSpace } =
    useResumeLayout({
      page: {
        // Content area width (794px - 60px left - 60px right = 674px)
        width: 674,
        height: 1123,
        marginTop: 40,
        marginBottom: 40,
        header: { height: 0 },
        footer: { height: 0 },
      },
      template: {
        style: {
          fontFamily: "Arial, sans-serif",
          fontSize: "14px",
          lineHeight: 1.6,
          columnCount: columnCount,
          columnGap: 20,
          columnWidths: columnCount === 2 ? [3, 2] : undefined, // 60%/40% ratio for 2 columns
          spaces: {
            work: {
              marginTop: 16,
              marginBottom: 12,
              intro: { marginTop: 8 },
              statements: {
                list: { marginTop: 8 },
                item: { marginTop: 4 },
              },
            },
          },
        },
      },
      events: {
        onPageCreated: (pageIndex) => {
          console.log(`Page ${pageIndex + 1} created`);
        },
        onContentPlaced: (result) => {
          console.log("Content placed:", result);
        },
        onOverflow: (contentType, required, available) => {
          console.warn(
            `Overflow: ${contentType} needs ${required}px, only ${available}px available`
          );
        },
      },
    });

  // Track ongoing update to prevent race conditions
  const updateInProgressRef = useRef(false);
  const pendingUpdateRef = useRef(false);
  const prevFormDataRef = useRef<Partial<Resume>>(null);

  // Single unified update function for the entire resume
  // Reset the prevFormDataRef when engine changes (e.g., column toggle)
  // This ensures content gets re-added when the engine is recreated
  useEffect(() => {
    if (engine) {
      prevFormDataRef.current = null;
    }
  }, [engine]);

  useEffect(() => {
    if (!engine || !isReady) return;

    // Check if form data has changed
    const formDataChanged =
      JSON.stringify(prevFormDataRef.current) !== JSON.stringify(formData);

    if (!formDataChanged) return;

    // If an update is in progress, mark that we need another update
    if (updateInProgressRef.current) {
      pendingUpdateRef.current = true;
      return;
    }

    const updateResume = async () => {
      updateInProgressRef.current = true;
      prevFormDataRef.current = formData;

      try {
        // Reset first to clear any existing content
        engine.reset();

        const experiences = (formData.experience || []) as Position[];
        const education = (formData.education || []) as EducationItem[];
        const skills = (formData.skills || []) as Skill[];

        // Add all experiences
        for (const experience of experiences) {
          // Clean the experience data before sending to engine
          const cleanedExperience = {
            ...experience,
            // Filter out empty strings from description array
            description: (experience.description || []).filter(
              (item: string) => item && item.trim() !== ""
            ),
          };

          console.log(
            "Adding experience to engine:",
            JSON.stringify(cleanedExperience, null, 2)
          );
          await engine.addExperience(cleanedExperience, 0);
        }

        // Add all education items
        for (const edu of education) {
          await engine.addEducation(
            {
              _id: edu.id || `edu-${crypto.randomUUID()}`,
              degree: edu.title || "",
              institution: edu.subTitle || "",
              year: edu.startYear || "",
              description:
                edu.description
                  ?.split("\n")
                  .filter((line: string) => line.trim()) || [],
            },
            columnCount === 1 ? 0 : 1
          );
        }

        // Add all skills
        if (skills.length > 0) {
          console.log(
            "Adding skills to engine:",
            JSON.stringify(skills, null, 2)
          );
          await engine.addSkills(skills);
        }
      } catch (error) {
        console.error("Error updating resume:", error);
      } finally {
        updateInProgressRef.current = false;

        // If another update was requested while we were processing, do it now
        if (pendingUpdateRef.current) {
          pendingUpdateRef.current = false;
          // Trigger another update by clearing the previous form data ref
          setTimeout(() => {
            prevFormDataRef.current = null;
          }, 0);
        }
      }
    };

    updateResume();
  }, [engine, isReady, formData, columnCount]);

  return (
    <div className="w-full max-w-[794px] mx-auto space-y-6">
      {/* Stats Card */}
      <Card>
        <CardContent className="flex items-center justify-between gap-4">
          <Badge
            variant={getRemainingSpaceBadgeVariant(remainingSpace)}
            className={getRemainingSpaceBadgeClass(remainingSpace)}
          >
            {pageCount} pages, {remainingSpace}px remaining
          </Badge>

          {/* Column Toggle */}
          <div className="flex items-center gap-2">
            <Button
              variant={columnCount === 1 ? "default" : "outline"}
              size="sm"
              onClick={() => setColumnCount(1)}
              className="gap-2"
            >
              <Columns2 size={16} />
              <span>1 Column</span>
            </Button>
            <Button
              variant={columnCount === 2 ? "default" : "outline"}
              size="sm"
              onClick={() => setColumnCount(2)}
              className="gap-2"
            >
              <Columns2 size={16} />
              <span>2 Columns</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* Resume Container - Fixed A4 Size */}
      <div
        key={`resume-container-${columnCount}`}
        ref={containerRef}
        className="resume-container bg-white"
        style={{
          width: "794px",
          minHeight: "1123px",
        }}
      />
    </div>
  );
}

function getRemainingSpaceBadgeVariant(
  space: number
): "default" | "secondary" | "destructive" {
  if (space < 100) return "destructive";
  if (space < 300) return "secondary";
  return "default";
}

function getRemainingSpaceBadgeClass(space: number): string {
  if (space < 100) return "bg-red-500 hover:bg-red-600";
  if (space < 300) return "bg-yellow-500 hover:bg-yellow-600";
  return "bg-green-500 hover:bg-green-600";
}

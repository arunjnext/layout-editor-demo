import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useResumeLayout } from "@/hooks/useResumeLayout";
import { useEffect, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import type { Position } from "resume-layout-engine";

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

  // Use useWatch for real-time updates on every keystroke
  const experiences = useWatch({
    control,
    name: "experience",
    defaultValue: [],
  }) as Position[];

  const { containerRef, engine, isReady, pageCount, remainingSpace } =
    useResumeLayout({
      page: {
        width: 794, // A4 width at 96 DPI (210mm)
        height: 1123, // A4 height at 96 DPI (297mm)
        marginTop: 0,
        marginBottom: 0,
        header: { height: 0 },
        footer: { height: 0 },
      },
      template: {
        style: {
          fontFamily: "Arial, sans-serif",
          fontSize: "14px",
          lineHeight: 1.6,
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
  const prevExperiencesRef = useRef<Position[]>([]);

  // Add/update experiences when they change with race condition handling
  useEffect(() => {
    if (!engine || !isReady) return;

    // Check if experiences have changed
    const experiencesChanged =
      JSON.stringify(prevExperiencesRef.current) !==
      JSON.stringify(experiences);

    if (!experiencesChanged) return;

    // If an update is in progress, mark that we need another update
    if (updateInProgressRef.current) {
      pendingUpdateRef.current = true;
      return;
    }

    const updateExperiences = async () => {
      updateInProgressRef.current = true;
      prevExperiencesRef.current = experiences;

      try {
        // Reset first to clear any existing content
        engine.reset();

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

          // Debug: Log the experience data being sent to the engine
          console.log(
            "Adding experience to engine:",
            JSON.stringify(cleanedExperience, null, 2)
          );
          await engine.addExperience(cleanedExperience);
        }
      } catch (error) {
        console.error("Error updating experiences:", error);
      } finally {
        updateInProgressRef.current = false;

        // If another update was requested while we were processing, do it now
        if (pendingUpdateRef.current) {
          pendingUpdateRef.current = false;
          // Trigger another update by clearing the previous experiences ref
          setTimeout(() => {
            prevExperiencesRef.current = [];
          }, 0);
        }
      }
    };

    updateExperiences();
  }, [engine, isReady, experiences]);

  return (
    <div className="w-full max-w-[210mm] mx-auto space-y-6">
      {/* Stats Card */}
      <Card>
        <CardContent>
          <Badge
            variant={getRemainingSpaceBadgeVariant(remainingSpace)}
            className={getRemainingSpaceBadgeClass(remainingSpace)}
          >
            {pageCount} pages, {remainingSpace}px remaining
          </Badge>
        </CardContent>
      </Card>
      {/* Resume Container - Fixed A4 Size */}
      <div
        ref={containerRef}
        className="resume-container w-[210mm] min-h-[297mm] bg-white"
        style={{
          width: "210mm",
          minHeight: "297mm",
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

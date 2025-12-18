import { BriefcaseBusiness } from "lucide-react";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function EmptyExperience() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <BriefcaseBusiness size={24} />
        </EmptyMedia>
        <EmptyTitle>No Experience Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any experience yet. Get started by creating
          your first experience.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent></EmptyContent>
    </Empty>
  );
}

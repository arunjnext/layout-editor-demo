import { GraduationCap } from "lucide-react";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function EmptyEducation() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <GraduationCap size={24} />
        </EmptyMedia>
        <EmptyTitle>No Education Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t added any education yet. Get started by adding your
          first degree or certification.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent></EmptyContent>
    </Empty>
  );
}


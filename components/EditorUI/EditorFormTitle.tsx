import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils/helpers";
import type { HTMLAttributes } from "react";

interface EditorFormTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  title: string;
  className?: string;
}

export const EditorFormTitle = ({
  title,
  className,
  ...props
}: EditorFormTitleProps) => {
  return (
    <Text
      as="h3"
      variant="sm"
      weight="medium"
      className={cn("block text-foreground", className)}
      {...props}
    >
      {title}
    </Text>
  );
};

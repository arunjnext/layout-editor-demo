import { cn } from "@/lib/utils/helpers";
import type { HTMLAttributes, ReactNode } from "react";

interface EditorFormBlockProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const EditorFormBlock = ({
  children,
  className,
  ...props
}: EditorFormBlockProps) => {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      {children}
    </div>
  );
};

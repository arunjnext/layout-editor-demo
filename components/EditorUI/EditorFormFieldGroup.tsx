import { cn } from "@/lib/utils/helpers";
import type { HTMLAttributes, ReactNode } from "react";

interface EditorFormFieldGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const EditorFormFieldGroup = ({
  children,
  className,
  ...props
}: EditorFormFieldGroupProps) => {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      {children}
    </div>
  );
};

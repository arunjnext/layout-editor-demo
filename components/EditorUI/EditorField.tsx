import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils/helpers";
import type { HTMLAttributes, ReactNode } from "react";

interface EditorFieldProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const EditorFieldRow = ({
  children,
  className,
  ...props
}: EditorFieldProps) => {
  return (
    <div
      className={cn("flex flex-col md:flex-row gap-2.5", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const EditorFieldItem = ({
  children,
  className,
  ...props
}: EditorFieldProps) => {
  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)} {...props}>
      {children}
    </div>
  );
};

interface EditorFieldLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  className?: string;
}

export const EditorFieldLabel = ({
  children,
  className,
  ...props
}: EditorFieldLabelProps) => {
  return (
    <Label className={className} {...props}>
      {children}
    </Label>
  );
};

export const EditorFieldCheckbox = ({
  children,
  className,
  ...props
}: EditorFieldProps) => {
  return (
    <div
      className={cn("flex flex-row gap-2 items-center", className)}
      {...props}
    >
      {children}
    </div>
  );
};

"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useEditor } from "@/hooks/useEditor";
import { cn } from "@/lib/utils/helpers";
import { Eye, EyeOff, GripVertical, Plus, Trash2 } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

const defaultTranslations: Record<string, string> = {
  addExperience: "Add Experience",
  addEducation: "Add Education",
  addSkill: "Add Skill",
  addProficiency: "Add Proficiency",
  addCustomSection: "Add Custom Section",
};

interface AccordionWrapperProps {
  children: ReactNode;
  fields: Array<{ id: string }>;
  [key: string]: unknown;
}

export const AccordionWrapper = ({
  children,
  fields,
  ...props
}: AccordionWrapperProps) => {
  const [activeAccordion, setActiveAccordion] = useState<string[]>([]);
  const lastLength = useRef(fields.length);

  useEffect(() => {
    if (fields.length > 0 && fields.length > lastLength.current) {
      setTimeout(() => {
        setActiveAccordion([fields[fields.length - 1].id]);
      }, 0);
    }
    lastLength.current = fields.length;
  }, [fields]);

  return (
    <Accordion
      value={activeAccordion}
      {...props}
      onValueChange={(value) => {
        setActiveAccordion(value);
      }}
    >
      {children}
    </Accordion>
  );
};

interface ReorderGroupProps {
  className?: string;
  children: ReactNode;
}

export const ReorderGroup = ({ className, children }: ReorderGroupProps) => {
  return <div className={cn("space-y-2.5", className)}>{children}</div>;
};

interface ReorderItemProps {
  id: string;
  className?: string;
  children: ReactNode;
}

export const ReorderItem = ({ id, className, children }: ReorderItemProps) => {
  return (
    <div id={id} className={className}>
      {children}
    </div>
  );
};

interface AddSectionProps {
  text: string;
  onClick: () => void;
}

export const AddSection = ({ text, onClick }: AddSectionProps) => {
  const { visiblityControls } = useEditor();

  if (visiblityControls) {
    return null;
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      className="w-full justify-start p-4 border border-dashed border-slate-300 rounded-lg transition-colors hover:text-slate-700 hover:border-slate-400 mb-5"
    >
      <Plus />
      {defaultTranslations[text] || text}
    </Button>
  );
};

interface SectionItemProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export const SectionItem = ({ id, children, className }: SectionItemProps) => {
  return (
    <ReorderItem id={id}>
      <AccordionItem
        value={id}
        className={cn(
          "relative border border-border rounded-lg bg-custom-gradient select-none",
          className
        )}
      >
        {children}
      </AccordionItem>
    </ReorderItem>
  );
};

interface SectionReorderProps {
  dragHandler: (event: React.PointerEvent) => void;
  className?: string;
  size?: number;
}

export const SectionReorder = ({
  dragHandler,
  className,
  size = 20,
}: SectionReorderProps) => {
  return (
    <GripVertical
      size={size}
      className={cn("text-muted-foreground cursor-grab shrink-0", className)}
      onPointerDown={dragHandler}
    />
  );
};

interface SectionVisibilityHandlerProps {
  isVisible: boolean;
  className?: string;
  onClick: () => void;
}

export const SectionVisibilityHandler = ({
  isVisible,
  className,
  onClick,
}: SectionVisibilityHandlerProps) => {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className={cn("[&_svg]:size-5", className)}
      onClick={onClick}
    >
      {isVisible ? <Eye /> : <EyeOff />}
    </Button>
  );
};

interface SectionTriggerProps {
  label: string;
  className?: string;
  isVisible: boolean;
}

export const SectionTrigger = ({
  label,
  className,
  isVisible,
}: SectionTriggerProps) => {
  return (
    <AccordionTrigger
      className={cn(
        "py-4 select-none hover:no-underline truncate gap-2",
        isVisible ? "opacity-100" : "opacity-35",
        className
      )}
    >
      <Text
        as="span"
        variant="sm"
        weight="medium"
        className="block text-foreground truncate"
      >
        {label}
      </Text>
    </AccordionTrigger>
  );
};

interface SectionRemoveProps {
  onClick: () => void;
  className?: string;
}

export const SectionRemove = ({ onClick, className }: SectionRemoveProps) => {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className={cn("text-muted-foreground", className)}
      onClick={onClick}
    >
      <Trash2 />
    </Button>
  );
};

interface SectionContentProps {
  className?: string;
  children: ReactNode;
}

export const SectionContent = ({
  className,
  children,
}: SectionContentProps) => {
  return (
    <AccordionContent
      className={cn(
        "pt-2 px-4 pb-4 space-y-6 divide-y divide-border [&>*:not(:first-child)]:pt-6",
        className
      )}
    >
      {children}
    </AccordionContent>
  );
};

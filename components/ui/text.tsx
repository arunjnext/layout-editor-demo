"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const textVariants = cva("", {
  variants: {
    variant: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      icon: "",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    variant: "base",
    weight: "normal",
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ className, variant, weight, as = "p", ...props }, ref) => {
    const Component = as;
    return (
      <Component
        ref={ref as React.RefObject<HTMLParagraphElement>}
        className={cn(textVariants({ variant, weight }), className) as string}
        {...props}
      />
    );
  }
);
Text.displayName = "Text";

export { Text, textVariants };

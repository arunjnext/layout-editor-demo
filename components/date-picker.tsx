"use client";

import { CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  id?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function DatePicker({
  id,
  value,
  onChange,
  placeholder = "Select date",
  className,
  disabled = false,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  // Convert string date (YYYY-MM or YYYY-MM-DD) to Date object
  const dateValue = React.useMemo(() => {
    if (!value) return undefined;
    try {
      // Handle YYYY-MM format (month picker)
      if (/^\d{4}-\d{2}$/.test(value)) {
        const [year, month] = value.split("-");
        return new Date(parseInt(year), parseInt(month) - 1, 1);
      }
      // Handle full date format
      return new Date(value);
    } catch {
      return undefined;
    }
  }, [value]);

  // Format date for display
  const displayValue = React.useMemo(() => {
    if (!dateValue) return null;
    return dateValue.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  }, [dateValue]);

  // Handle date selection
  const handleSelect = (date: Date | undefined) => {
    if (!date) {
      onChange?.("");
      setOpen(false);
      return;
    }

    // Format as YYYY-MM
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    onChange?.(`${year}-${month}`);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="w-full">
        <Button
          id={id}
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal",
            !displayValue && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {displayValue || placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={dateValue}
          onSelect={handleSelect}
          captionLayout="dropdown"
          fromYear={1970}
          toYear={new Date().getFullYear() + 5}
          disabled={disabled}
        />
      </PopoverContent>
    </Popover>
  );
}

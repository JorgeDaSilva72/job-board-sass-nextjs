"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

type Option = {
  readonly value: string;
  readonly label: string;
};

interface MultiSelectProps {
  options: readonly Option[]; // Modifié pour accepter readonly
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export function MultiSelect({
  options,
  values,
  onChange,
  placeholder = "Select items...",
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = (value: string) => {
    onChange(values.filter((s) => s !== value));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Backspace" && !inputValue && values.length > 0) {
      handleUnselect(values[values.length - 1]);
    }
  };

  return (
    <Command
      className="overflow-visible bg-transparent"
      onKeyDown={handleKeyDown}
    >
      <div className="group border border-input px-3 py-2 text-sm rounded-md">
        <div className="flex gap-1 flex-wrap">
          {values.map((value) => {
            const option = options.find((opt) => opt.value === value);
            return (
              <Badge
                key={value}
                variant="secondary"
                className="hover:bg-secondary"
              >
                {option?.label}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(value);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(value)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          <CommandPrimitive.Input
            placeholder={placeholder}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && (
          <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto max-h-60">
              {options.map((option) => {
                const isSelected = values.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        handleUnselect(option.value);
                      } else {
                        onChange([...values, option.value]);
                      }
                      setInputValue("");
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check className={cn("h-4 w-4")} />
                    </div>
                    {option.label}
                  </CommandItem>
                );
              })}
              {options.length === 0 && (
                <CommandEmpty>No results found.</CommandEmpty>
              )}
            </CommandGroup>
          </div>
        )}
      </div>
    </Command>
  );
}

export default MultiSelect;

"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/molecules/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/molecules/popover";

interface ConfigurationComboboxProps {
  configurations: { value: string; label: string }[];
  onSelect: (value: number) => void;
  placeholder: string;
}

export function ConfigurationCombobox({
  configurations,
  onSelect,
  placeholder,
}: ConfigurationComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? configurations.find(
                (configuration) => configuration.value === value
              )?.label
            : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No configuration found.</CommandEmpty>
            <CommandGroup>
              {configurations.map((configuration) => (
                <CommandItem
                  key={configuration.value}
                  value={configuration.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    onSelect(Number(currentValue));
                  }}
                >
                  {configuration.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === configuration.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

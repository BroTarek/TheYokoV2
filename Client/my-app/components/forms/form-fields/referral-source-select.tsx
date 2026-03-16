'use client';

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { fetchReferralSources } from "@/features/referralSources/api";
import { ReferralSource } from "@/utils/schemas";

interface ReferralSourceSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  onLabelChange?: (label: string) => void;
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
}

export function ReferralSourceSelect({
  value = "",
  onChange,
  onLabelChange,
  placeholder = "Select how you heard about us",
  className,
  triggerClassName,
}: ReferralSourceSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [showOtherInput, setShowOtherInput] = React.useState(false);
  const [otherValue, setOtherValue] = React.useState("");

  const { data: referralSourcesData, isLoading } = useQuery({
    queryKey: ["referralSources"],
    queryFn: () => fetchReferralSources(),
  });

  const sources: ReferralSource[] = referralSourcesData?.data ?? [];

  const handleSelect = (id: string) => {
    if (id === "other") {
      setShowOtherInput(true);
      return;
    }

    onChange?.(id);
    const selectedSource = sources.find(s => s.id === id);
    if (selectedSource) {
      onLabelChange?.(selectedSource.name);
    }
    setOpen(false);
    setSearch("");
    setShowOtherInput(false);
    setOtherValue("");
  };

  const handleOtherSubmit = () => {
    if (otherValue.trim()) {
      onChange?.(otherValue.trim());
      onLabelChange?.(otherValue.trim());
      setOpen(false);
      setSearch("");
      setShowOtherInput(false);
      setOtherValue("");
    }
  };

  const handleOtherCancel = () => {
    setShowOtherInput(false);
    setOtherValue("");
  };

  const filteredSources = sources.filter((source) =>
    source.name.toLowerCase().includes(search.toLowerCase())
  );

  const hasExactMatch = sources.some(
    (source) => source.name.toLowerCase() === search.toLowerCase()
  );

  const isCustomValue = value && !sources.some((source) => source.id === value);

  const getLabelById = (id: string) => {
    const source = sources.find((s) => s.id === id);
    return source ? source.name : id;
  };

  const displayValue = value ? getLabelById(value) : "";

  return (
    <div className={cn("space-y-2", className)}>
      <label className="block font-medium text-sm text-primary-text">
        Where did you hear about the job offer
      </label>
      <Popover open={open} onOpenChange={(open) => {
        setOpen(open);
        if (!open) {
          setSearch("");
          setShowOtherInput(false);
          setOtherValue("");
        }
      }}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between h-[50px] px-4 rounded-lg",
              "border border-gray-300 bg-white text-primary-text",
              "focus:ring-2 focus:ring-kaizen-red/20 focus:border-kaizen-red",
              "hover:border-kaizen-red/60 transition-all duration-200",
              "data-[state=open]:border-kaizen-red data-[state=open]:ring-2 data-[state=open]:ring-kaizen-red/20",
              triggerClassName
            )}
          >
            <span className="truncate">
              {displayValue || placeholder}
            </span>
            <ChevronDown className="h-4 w-4 shrink-0 opacity-50 ml-2" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full p-0 border-gray-200 bg-white shadow-lg rounded-lg min-w-[300px]"
          align="start"
        >
          {showOtherInput ? (
            <div className="p-4">
              <div className="space-y-3">
                <div className="text-sm font-medium text-primary-text">
                  Enter how you heard about us
                </div>
                <Input
                  placeholder="Type here..."
                  value={otherValue}
                  onChange={(e) => setOtherValue(e.target.value)}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleOtherSubmit();
                    }
                    if (e.key === 'Escape') {
                      handleOtherCancel();
                    }
                  }}
                  className="h-9"
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleOtherSubmit}
                    disabled={!otherValue.trim()}
                    className="h-8 px-3 bg-kaizen-red hover:bg-kaizen-red/90"
                  >
                    Add
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleOtherCancel}
                    className="h-8 px-3"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Search input */}
              <div className="p-3 border-b border-gray-200">
                <div className="relative">
                  <Input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-9 pl-9"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Options list */}
              <div className="max-h-[280px] overflow-y-auto py-1">
                {isLoading ? (
                  <div className="px-4 py-3 text-sm text-gray-400 text-center">Loading...</div>
                ) : filteredSources.length > 0 ? (
                  <div className="px-1">
                    {filteredSources.map((source) => (
                      <button
                        key={source.id}
                        onClick={() => handleSelect(source.id)}
                        className={cn(
                          "w-full text-left py-2.5 px-3 rounded-md cursor-pointer transition-colors duration-150",
                          "hover:bg-red-50 hover:text-kaizen-red",
                          "focus:bg-red-50 focus:text-kaizen-red outline-none",
                          value === source.id && "bg-red-50 text-kaizen-red font-medium"
                        )}
                      >
                        {source.name}
                      </button>
                    ))}
                  </div>
                ) : (
                  search.trim() && !hasExactMatch && (
                    <div className="px-4 py-3 border-t border-gray-100">
                      <div className="space-y-3">
                        <p className="text-sm text-gray-500 text-center">
                          No matching option found.
                        </p>
                        <button
                          onClick={() => setShowOtherInput(true)}
                          className="w-full text-center py-2 px-3 rounded-md border border-kaizen-red/20 text-kaizen-red hover:bg-red-50 transition-colors duration-150"
                        >
                          + Add &quot;{search}&quot; as custom option
                        </button>
                      </div>
                    </div>
                  )
                )}

                {/* Always show "Other" option */}
                <div className="border-t border-gray-100 mt-1">
                  <button
                    onClick={() => setShowOtherInput(true)}
                    className={cn(
                      "w-full text-left py-2.5 px-3 rounded-md cursor-pointer transition-colors duration-150",
                      "hover:bg-red-50 hover:text-kaizen-red",
                      "focus:bg-red-50 focus:text-kaizen-red outline-none",
                      isCustomValue && "bg-red-50 text-kaizen-red font-medium"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full border border-kaizen-red flex items-center justify-center">
                        <span className="text-xs font-bold text-kaizen-red">+</span>
                      </div>
                      <span>
                        {isCustomValue ? `Custom: ${value}` : "Other (Specify)"}
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}

// Usage example
export function ReferralSourceExample() {
  const [referralSource, setReferralSource] = React.useState("");

  return (
    <ReferralSourceSelect
      value={referralSource}
      onChange={setReferralSource}
      placeholder="Select how you heard about us"
    />
  );
}
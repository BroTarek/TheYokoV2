'use client';

import * as React from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { fetchRegions } from "@/features/regions/api";
import { Region } from "@/utils/schemas";

// Local metadata for display purposes (flags & dial codes) keyed by region code.
// IDs are NOT stored here — they come from the API.
const CODE_META: Record<string, { dial_code: string }> = {
  SY:  { dial_code: "+963" },
  YE:  { dial_code: "+967" },
  PS:  { dial_code: "+970" },
  LY:  { dial_code: "+218" },
  JO:  { dial_code: "+962" },
  NA:  { dial_code: "000"  },
  IQ:  { dial_code: "+964" },
  LB:  { dial_code: "+961" },
  GCC: { dial_code: "000"  },
  EG:  { dial_code: "+20"  },
  SA:  { dial_code: "+966" },
  AE:  { dial_code: "+971" },
  MA:  { dial_code: "+212" },
  TN:  { dial_code: "+216" },
  DZ:  { dial_code: "+213" },
  SD:  { dial_code: "+249" },
  KW:  { dial_code: "+965" },
  QA:  { dial_code: "+974" },
  BH:  { dial_code: "+973" },
  OM:  { dial_code: "+968" },
};

interface CountrySelectProps {
  value?: string[];      // array of region IDs
  onChange?: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function CountrySelect({
  value = [],
  onChange,
  placeholder = "Select countries...",
  className,
}: CountrySelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const { data: regionsData, isLoading } = useQuery({
    queryKey: ["regions"],
    queryFn: () => fetchRegions(),
  });

  const regions: Region[] = regionsData?.data ?? [];

  const handleSelect = (regionId: string) => {
    const newValue = value.includes(regionId)
      ? value.filter((item) => item !== regionId)
      : [...value, regionId];
    onChange?.(newValue);
  };

  const removeRegion = (regionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(value.filter((item) => item !== regionId));
  };

  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.([]);
  };

  const filteredRegions = React.useMemo(
    () =>
      regions.filter(
        (r) =>
          r.name.toLowerCase().includes(search.toLowerCase()) ||
          r.code.toLowerCase().includes(search.toLowerCase())
      ),
    [regions, search]
  );

  const selectedRegions = React.useMemo(
    () => regions.filter((r) => value.includes(r.id)),
    [regions, value]
  );

  const getFlagSrc = (code: string) =>
    `https://raw.githubusercontent.com/hampusborgos/country-flags/main/svg/${code.toLowerCase()}.svg`;

  const getDialCode = (code: string) => CODE_META[code]?.dial_code ?? "";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between h-auto min-h-[44px] px-3 py-2",
            "border-gray-300 bg-white hover:bg-white hover:border-vivid-red/60",
            "focus:border-vivid-red focus:ring-2 focus:ring-vivid-red/20",
            className
          )}
        >
          <div className="flex flex-wrap items-center gap-2 flex-1">
            {selectedRegions.length > 0 ? (
              <>
                {selectedRegions.slice(0, 3).map((region) => (
                  <Badge
                    key={region.id}
                    variant="secondary"
                    className="flex items-center gap-1.5 bg-red-50 text-vivid-red hover:bg-red-100 border-vivid-red/20"
                  >
                    <img
                      src={getFlagSrc(region.code)}
                      alt={`${region.code} flag`}
                      className="w-4 h-3 object-contain rounded-[1px]"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <span className="text-xs font-medium">{region.name}</span>
                    <X
                      className="w-3 h-3 ml-1 cursor-pointer hover:text-red-700"
                      onClick={(e) => removeRegion(region.id, e)}
                    />
                  </Badge>
                ))}
                {selectedRegions.length > 3 && (
                  <Badge variant="outline" className="bg-gray-100">
                    +{selectedRegions.length - 3} more
                  </Badge>
                )}
              </>
            ) : (
              <span className="text-primary-text/60">{placeholder}</span>
            )}
          </div>
          <div className="flex items-center gap-1 ml-2">
            {selectedRegions.length > 0 && (
              <X
                className="h-4 w-4 text-gray-400 hover:text-vivid-red cursor-pointer"
                onClick={clearAll}
              />
            )}
            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full p-0 border-gray-200 bg-white shadow-lg"
        align="start"
      >
        <Command className="border-none">
          <CommandInput
            placeholder="Search regions..."
            value={search}
            onValueChange={setSearch}
            className="h-11 focus:ring-0"
          />
          <CommandList className="max-h-[300px]">
            {isLoading ? (
              <div className="py-6 text-center text-sm text-gray-400">
                Loading...
              </div>
            ) : (
              <>
                <CommandEmpty className="py-6 text-center text-sm text-gray-500">
                  No region found.
                </CommandEmpty>
                <CommandGroup>
                  {filteredRegions.map((region) => {
                    const isSelected = value.includes(region.id);
                    return (
                      <CommandItem
                        key={region.id}
                        value={region.code}
                        onSelect={() => handleSelect(region.id)}
                        className="cursor-pointer py-2.5 px-3 aria-selected:bg-red-50 aria-selected:text-vivid-red"
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "w-5 h-5 rounded border flex items-center justify-center",
                                isSelected
                                  ? "bg-vivid-red border-vivid-red"
                                  : "border-gray-300"
                              )}
                            >
                              {isSelected && (
                                <Check className="h-3.5 w-3.5 text-white" />
                              )}
                            </div>
                            <img
                              src={getFlagSrc(region.code)}
                              alt={`${region.code} flag`}
                              className="w-6 h-4 object-contain rounded-[2px]"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display =
                                  "none";
                              }}
                            />
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-primary-text">
                                {region.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                {getDialCode(region.code)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

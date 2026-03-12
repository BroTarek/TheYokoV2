'use client';

import * as React from "react";
import { Check, ChevronDown, Search, X } from "lucide-react";
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

// Define the Country type
interface Country {
  id: string;
  code: string;
  name: string;
  dial_code: string;
}

// Arab countries data with names and codes
const ARAB_COUNTRIES: Country[] = [
  { id:"d5a05ec8-896a-44c9-961d-66bc599331e1", code: "SY", name: "Syria", dial_code: "+963" },
  { id:"fdd5a4f7-5576-4940-b4b2-f4d62eb572fd", code: "YE", name: "Yemen", dial_code: "+967" },
  { id:"ba24bd2d-5a06-4184-bfe7-2b6cb480947d", code: "PS", name: "Palestine", dial_code: "+970" },
  { id:"b6d06fc4-b5b1-45ef-b9fa-04c9b23db3ee", code: "LY", name: "Libya", dial_code: "+218" },
  { id:"cef55c69-2f06-4537-b02c-b1c820c54c1f", code: "JO", name: "Jordan", dial_code: "+962" },
  { id:"d53ac6db-4800-4088-aab7-923929b6d9ca", code: "NA", name: "North Africa", dial_code: "000" },
  { id:"a2912a90-ebb9-4cf1-bedf-88c655141660", code: "IQ", name: "Iraq", dial_code: "+964" },
  { id:"aa54f7e7-bd05-48dc-8021-e4148b5dd465", code: "LB", name: "Lebanon", dial_code: "+961" },
  { id:"1b615c89-daec-485a-9b8b-19a7bcca001f", code: "GCC", name: "GCC", dial_code: "000" },
];

interface CountrySelectProps {
  value?: string[]; // Now this will be an array of IDs
  onChange?: (value: string[]) => void; // Passes up array of IDs
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

  // Helper function to get country by ID
  const getCountryById = (id: string) => {
    return ARAB_COUNTRIES.find(country => country.id === id);
  };

  // Helper function to get country by code (for the dropdown items)
  const getCountryByCode = (code: string) => {
    return ARAB_COUNTRIES.find(country => country.code === code);
  };

  const handleSelect = (countryId: string) => {
    const newValue = value.includes(countryId)
      ? value.filter((item) => item !== countryId)
      : [...value, countryId];
    
    onChange?.(newValue);
    
    // Log the selected country details
    const selectedCountry = ARAB_COUNTRIES.find(country => country.id === countryId);
    console.log('Selected country:', selectedCountry);
    console.log('All selected IDs:', newValue);
  };

  const removeCountry = (countryId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newValue = value.filter((item) => item !== countryId);
    onChange?.(newValue);
  };

  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.([]);
  };

  // Filter countries based on search
  const filteredCountries = React.useMemo(() => 
    ARAB_COUNTRIES.filter(
      (country) =>
        country.name.toLowerCase().includes(search.toLowerCase()) ||
        country.code.toLowerCase().includes(search.toLowerCase()) ||
        country.dial_code.includes(search)
    ), [search]);

  // Get selected country objects from IDs
  const selectedCountries = React.useMemo(() => 
    ARAB_COUNTRIES.filter((country) =>
      value.includes(country.id)
    ), [value]);

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
            {selectedCountries.length > 0 ? (
              <>
                {selectedCountries.slice(0, 3).map((country) => (
                  <Badge
                    key={country.id}
                    variant="secondary"
                    className="flex items-center gap-1.5 bg-red-50 text-vivid-red hover:bg-red-100 border-vivid-red/20"
                  >
                    <img
                      src={`https://raw.githubusercontent.com/hampusborgos/country-flags/main/svg/${country.code.toLowerCase()}.svg`}
                      alt={`${country.code} flag`}
                      className="w-4 h-3 object-contain rounded-[1px]"
                      onError={(e) => {
                        // Fallback for regional codes without flags
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <span className="text-xs font-medium">{country.name}</span>
                    <X
                      className="w-3 h-3 ml-1 cursor-pointer hover:text-red-700"
                      onClick={(e) => removeCountry(country.id, e)}
                    />
                  </Badge>
                ))}
                {selectedCountries.length > 3 && (
                  <Badge variant="outline" className="bg-gray-100">
                    +{selectedCountries.length - 3} more
                  </Badge>
                )}
              </>
            ) : (
              <span className="text-primary-text/60">{placeholder}</span>
            )}
          </div>
          <div className="flex items-center gap-1 ml-2">
            {selectedCountries.length > 0 && (
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
            placeholder="Search countries..."
            value={search}
            onValueChange={setSearch}
            className="h-11 focus:ring-0"
          />
          <CommandList className="max-h-[300px]">
            <CommandEmpty className="py-6 text-center text-sm text-gray-500">
              No country found.
            </CommandEmpty>
            <CommandGroup>
              {filteredCountries.map((country) => {
                const isSelected = value.includes(country.id);
                return (
                  <CommandItem
                    key={country.id}
                    value={country.code} // Using code for search, but we'll select by ID
                    onSelect={() => handleSelect(country.id)}
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
                          src={`https://raw.githubusercontent.com/hampusborgos/country-flags/main/svg/${country.code.toLowerCase()}.svg`}
                          alt={`${country.code} flag`}
                          className="w-6 h-4 object-contain rounded-[2px]"
                          onError={(e) => {
                            // Fallback for regional codes without flags
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-primary-text">
                            {country.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {country.dial_code}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// Example usage component


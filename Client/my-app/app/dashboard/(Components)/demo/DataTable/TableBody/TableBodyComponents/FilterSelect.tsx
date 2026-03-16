import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const FilterSelect = <T extends string>({ 
    label, 
    options, 
    value, 
    onChange, 
    placeholder,
    renderOption 
}: { 
    label: string;
    options: Array<{ value: T; label: string; icon?: React.ReactNode }>;
    value: T;
    onChange: (value: T) => void;
    placeholder: string;
    renderOption?: (option: any, isSelected: boolean) => React.ReactNode;
}) => (
    <div className="flex flex-col gap-1.5 w-full lg:w-auto">
        {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full lg:w-48 bg-white">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {renderOption ? renderOption(option, value === option.value) : option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
);
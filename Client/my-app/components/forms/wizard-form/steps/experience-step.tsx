'use client';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { FieldSelector } from '@/components/forms/form-fields/field-selector';
import { EXPERIENCE_LEVELS, FORM_FIELD_IDS } from '@/components/forms/wizard-form/lib/constants';

interface ExperienceStepProps {
    selectedExperience: string;
    setSelectedExperience: (value: string) => void;
    selectedFields: string; // This should be a single ID string
    setSelectedFields: (value: string[]) => void; // Keeping array for compatibility
    setSelectedFieldId: (fieldId: string) => void;
}

export function ExperienceStep({
    selectedExperience,
    setSelectedExperience,
    selectedFields,
    setSelectedFields,
    setSelectedFieldId
}: ExperienceStepProps) {
    return (
        <div className="space-y-6">
            {/* Years of Experience Section */}
            <div className="space-y-2">
                <label
                    htmlFor={FORM_FIELD_IDS.EXPERIENCE}
                    className="block font-medium text-sm text-primary-text"
                >
                    Years of Experience
                </label>
                <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                    <SelectTrigger
                        id={FORM_FIELD_IDS.EXPERIENCE}
                        className="w-full h-[50px] px-4 rounded-lg border border-gray-300 bg-white text-primary-text 
              focus:ring-2 focus:ring-kaizen-red/20 focus:border-kaizen-red
              hover:border-kaizen-red/60 transition-all duration-200
              data-[state=open]:border-kaizen-red data-[state=open]:ring-2 data-[state=open]:ring-kaizen-red/20"
                    >
                        <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg border border-gray-200 bg-white shadow-lg py-1 animate-in fade-in-80 zoom-in-95">
                        {EXPERIENCE_LEVELS.map((level) => (
                            <SelectItem
                                key={level.value}
                                value={level.value}
                                className="py-2.5 px-3 rounded-md cursor-pointer transition-colors duration-150
                  hover:bg-red-50 hover:text-kaizen-red
                  focus:bg-red-50 focus:text-kaizen-red
                  data-[state=checked]:bg-red-50 data-[state=checked]:text-kaizen-red
                  data-[state=checked]:font-medium"
                            >
                                {level.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Field Selection Section */}
            <FieldSelector
                setSelectedFieldId={setSelectedFieldId}
                selectedFields={selectedFields} // Passing the ID string
                onFieldsChange={setSelectedFields} // Keeping for array compatibility
            />
        </div>
    );
}
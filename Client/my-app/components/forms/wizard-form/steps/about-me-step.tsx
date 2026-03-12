'use client';

import { PositionSelect } from '@/components/forms/form-fields/position-select';
import { CountrySelect } from '@/components/forms/form-fields/country-select';
import { Textarea } from '@/components/ui/textarea';
import { FORM_FIELD_IDS } from '@/components/forms/wizard-form/lib/constants';

interface AboutMeStepProps {
    selectedPosition: string;
    setSelectedPosition: (value: string) => void;
    setJobTitleLabel?: (value: string) => void;
    company: string;
    setCompany: (value: string) => void;
    selectedCountries: string[];
    setSelectedCountries: (value: string[]) => void;
    experienceDescription: string;
    setExperienceDescription: (value: string) => void;
    selectedFieldId: string;
}

export function AboutMeStep({
    selectedPosition,
    setSelectedPosition,
    setJobTitleLabel,
    company,
    setCompany,
    selectedCountries,
    setSelectedCountries,
    experienceDescription,
    setExperienceDescription,
    selectedFieldId
}: AboutMeStepProps) {
    return (
        <div className="space-y-6">
            {/* Position Applied To */}
            <div>
                <label
                    htmlFor={FORM_FIELD_IDS.POSITION}
                    className="block font-medium mb-2 text-sm text-primary-text"
                >
                    Position Applied to
                </label>
                <PositionSelect
                    fieldId={selectedFieldId}
                    value={selectedPosition}
                    onChange={setSelectedPosition}
                    onLabelChange={setJobTitleLabel}
                    placeholder="Choose Position..."
                />
            </div>

            {/* Last Company */}
            <div>
                <label
                    htmlFor={FORM_FIELD_IDS.COMPANY}
                    className="block font-medium mb-2 text-sm text-primary-text"
                >
                    Last Company You Worked in
                </label>
                <input
                    id={FORM_FIELD_IDS.COMPANY}
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Enter your company name"
                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent 
            border border-gray-300 bg-white text-primary-text
            focus:ring-kaizen-red/20 focus:border-kaizen-red
            hover:border-kaizen-red/60 transition-all duration-200"
                />
            </div>

            {/* Countries Worked In */}
            <div className="space-y-4">
                <div>
                    <label
                        htmlFor={FORM_FIELD_IDS.COUNTRIES}
                        className="block font-medium text-sm text-primary-text mb-2"
                    >
                        Select Countries You Worked In
                    </label>
                    <CountrySelect
                        value={selectedCountries}
                        onChange={setSelectedCountries}
                        placeholder="Choose countries..."
                    />
                </div>
                {selectedCountries.length > 0 && (
                    <div className="text-sm text-gray-600">
                        Selected: {selectedCountries.length} country(ies)
                    </div>
                )}
            </div>

            {/* Experience Description */}
            <div>
                <label
                    htmlFor={FORM_FIELD_IDS.EXPERIENCE_DESCRIPTION}
                    className="block font-medium mb-2 text-sm text-primary-text"
                >
                    Share Your Achievements, Projects, Experience here
                </label>
                <Textarea
                    id={FORM_FIELD_IDS.EXPERIENCE_DESCRIPTION}
                    value={experienceDescription}
                    onChange={(e) => setExperienceDescription(e.target.value)}
                />
            </div>
        </div>
    );
}

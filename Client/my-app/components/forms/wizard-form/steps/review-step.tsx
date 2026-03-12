'use client';

import { FORM_FIELD_IDS } from '@/components/forms/wizard-form/lib/constants';
interface Country {
    id: string;
    code: string;
    name: string;
    dial_code: string;
}

// Arab countries data with names and codes
const ARAB_COUNTRIES: Country[] = [
    { id: "d5a05ec8-896a-44c9-961d-66bc599331e1", code: "SY", name: "Syria", dial_code: "+963" },
    { id: "fdd5a4f7-5576-4940-b4b2-f4d62eb572fd", code: "YE", name: "Yemen", dial_code: "+967" },
    { id: "ba24bd2d-5a06-4184-bfe7-2b6cb480947d", code: "PS", name: "Palestine", dial_code: "+970" },
    { id: "b6d06fc4-b5b1-45ef-b9fa-04c9b23db3ee", code: "LY", name: "Libya", dial_code: "+218" },
    { id: "cef55c69-2f06-4537-b02c-b1c820c54c1f", code: "JO", name: "Jordan", dial_code: "+962" },
    { id: "d53ac6db-4800-4088-aab7-923929b6d9ca", code: "NA", name: "North Africa", dial_code: "000" },
    { id: "a2912a90-ebb9-4cf1-bedf-88c655141660", code: "IQ", name: "Iraq", dial_code: "+964" },
    { id: "aa54f7e7-bd05-48dc-8021-e4148b5dd465", code: "LB", name: "Lebanon", dial_code: "+961" },
    { id: "1b615c89-daec-485a-9b8b-19a7bcca001f", code: "GCC", name: "GCC", dial_code: "000" },
];

interface ReviewStepProps {
    data: {
        firstName: string;
        lastName: string;
        email: string;
        experience: string;
        countries: string[];
        position: string;
        company: string;
        googleDriveUrl: string;
        jobTitleLabel?: string;
        referralSourceLabel?: string;
    }
}

export function ReviewStep({ data }: ReviewStepProps) {
    const getSelectedCountries = () => {
        return ARAB_COUNTRIES.filter(country =>
            data.countries.includes(country.id)
        );
    };
    return (
        <div className="space-y-6">
            {/* Review Information */}
            <div className="rounded-lg p-6 bg-[#f9f9f9] border border-secondary-grey">
                <h3 className="font-semibold mb-4 text-small text-primary-text">
                    Review Your Information
                </h3>
                <div className="space-y-3">
                    <p className="text-small text-primary-text">
                        <span className="font-medium">First Name:</span>{' '}
                        <span className="text-secondary-grey">{data.firstName || 'N/A'}</span>
                    </p>
                    <p className="text-small text-primary-text">
                        <span className="font-medium">Last Name:</span>{' '}
                        <span className="text-secondary-grey">{data.lastName || 'N/A'}</span>
                    </p>
                    <p className="text-small text-primary-text">
                        <span className="font-medium">Email:</span>{' '}
                        <span className="text-secondary-grey">{data.email || 'N/A'}</span>
                    </p>
                    <p className="text-small text-primary-text">
                        <span className="font-medium">Experience:</span>{' '}
                        <span className="text-secondary-grey">{data.experience || 'N/A'}</span>
                    </p>
                    <p className="text-small text-primary-text">
                        <span className="font-medium">Regions I Worked In:</span>{' '}
                        <span className="text-secondary-grey">
                            {getSelectedCountries().length > 0 ? getSelectedCountries().map(c => c.name).join(', ') : 'N/A'}
                        </span>
                    </p>
                    <p className="text-small text-primary-text">
                        <span className="font-medium">Job Title:</span>{' '}
                        <span className="text-secondary-grey">{data.jobTitleLabel || data.position || 'N/A'}</span>
                    </p>
                    <p className="text-small text-primary-text">
                        <span className="font-medium">Referral Source:</span>{' '}
                        <span className="text-secondary-grey">{data.referralSourceLabel || 'N/A'}</span>
                    </p>
                    <p className="text-small text-primary-text">
                        <span className="font-medium">Last Company:</span>{' '}
                        <span className="text-secondary-grey">{data.company || 'N/A'}</span>
                    </p>
                    <p className="text-small text-primary-text">
                        <span className="font-medium">Documents Link:</span>{' '}
                        <span className="text-secondary-grey truncate block">
                            {data.googleDriveUrl ? (
                                <a href={data.googleDriveUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                    {data.googleDriveUrl}
                                </a>
                            ) : 'N/A'}
                        </span>
                    </p>
                </div>
            </div>

            {/* Confirmation Checkbox */}
            <label className="flex items-center gap-2 cursor-pointer">
                <input
                    id={FORM_FIELD_IDS.TERMS_CONFIRMATION}
                    type="checkbox"
                    className="w-4 h-4 rounded accent-kaizen-red"
                />
                <span className="text-small text-primary-text">
                    I confirm that all information is correct
                </span>
            </label>
        </div>
    );
}

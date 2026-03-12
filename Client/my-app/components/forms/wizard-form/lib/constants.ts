import { StepConfig, CountryCode } from '@/components/forms/wizard-form/types';

// Wizard Steps Configuration
export const WIZARD_STEPS: StepConfig[] = [
    { id: 1, title: 'Basic Info', description: 'Your personal details' },
    { id: 2, title: 'Experience', description: 'Your background' },
    { id: 3, title: 'About Me', description: 'General Information' },
    { id: 4, title: 'Documents', description: 'Upload files' },
    { id: 5, title: 'Review', description: 'Confirm details' },
];

// Country Codes for Phone Selection
export const COUNTRY_CODES: CountryCode[] = [
    { code: "SA", dial_code: "+966", name: "Saudi Arabia" },
    { code: "AE", dial_code: "+971", name: "United Arab Emirates" },
    { code: "EG", dial_code: "+20", name: "Egypt" },
    { code: "IQ", dial_code: "+964", name: "Iraq" },
    { code: "JO", dial_code: "+962", name: "Jordan" },
    { code: "LB", dial_code: "+961", name: "Lebanon" },
    { code: "KW", dial_code: "+965", name: "Kuwait" },
    { code: "QA", dial_code: "+974", name: "Qatar" },
    { code: "BH", dial_code: "+973", name: "Bahrain" },
    { code: "OM", dial_code: "+968", name: "Oman" },
    { code: "SY", dial_code: "+963", name: "Syria" },
    { code: "YE", dial_code: "+967", name: "Yemen" },
    { code: "PS", dial_code: "+970", name: "Palestine" },
    { code: "MA", dial_code: "+212", name: "Morocco" },
    { code: "DZ", dial_code: "+213", name: "Algeria" },
    { code: "TN", dial_code: "+216", name: "Tunisia" },
    { code: "LY", dial_code: "+218", name: "Libya" },
    { code: "SD", dial_code: "+249", name: "Sudan" },
    { code: "SO", dial_code: "+252", name: "Somalia" },
    { code: "MR", dial_code: "+222", name: "Mauritania" },
    { code: "DJ", dial_code: "+253", name: "Djibouti" },
    { code: "KM", dial_code: "+269", name: "Comoros" },
];

// Document Types
export const DOCUMENT_TYPES = [
    'Resume / CV',
    'Cover Letter',
    'Portfolio',
    'Certifications',
] as const;

// Experience Levels
export const EXPERIENCE_LEVELS = [
    { value: '0-5', label: '0-5 years' },
    { value: '5-10', label: '5-10 years' },
    { value: '10+', label: '10+ years' },
] as const;

// Form Field IDs (for accessibility and testing)
export const FORM_FIELD_IDS = {
    FIRST_NAME: 'first-name',
    LAST_NAME: 'last-name',
    EMAIL: 'email',
    PHONE: 'phone-number',
    REFERRAL_SOURCE: 'referral-source',
    USERNAME: 'username',
    PASSWORD: 'password',
    CONFIRM_PASSWORD: 'confirm-password',
    EXPERIENCE: 'years-of-experience',
    FIELDS: 'field-selector',
    POSITION: 'position',
    COMPANY: 'last-company',
    COUNTRIES: 'countries-worked-in',
    EXPERIENCE_DESCRIPTION: 'experience-description',
    DOCUMENTS: 'document-upload',
    DOCUMENT_TYPE: 'document-type',
    TERMS_CONFIRMATION: 'terms-confirmation',
} as const;

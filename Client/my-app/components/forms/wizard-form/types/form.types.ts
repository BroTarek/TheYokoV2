// Basic Info Step
export interface BasicInfoFormData {
    fullName: string;
    email: string;
    referralSource: string;
    countryCode: string;
    phoneNumber: string;
}

// Account Setup Step
export interface AccountSetupFormData {
    username: string;
    password: string;
    confirmPassword: string;
}

// Experience Step
export interface ExperienceFormData {
    yearsOfExperience: string;
    selectedFields: string[];
}

// About Me Step
export interface AboutMeFormData {
    position: string;
    lastCompany: string;
    countriesWorkedIn: string[];
    achievements: string;
}

// Documents Step
export interface DocumentsFormData {
    files: File[];
    documentType: string;
}

// Complete Wizard Form Data
export interface WizardFormData {
    basicInfo: BasicInfoFormData;
    accountSetup: AccountSetupFormData;
    experience: ExperienceFormData;
    aboutMe: AboutMeFormData;
    documents: DocumentsFormData;
    confirmed: boolean;
}

// Country Code Option
export interface CountryCode {
    code: string;
    dial_code: string;
    name?: string;
}

// Field Option
export interface FieldOption {
    id: string;
    label: string;
    value: string;
}

// Position Option
export interface PositionOption {
    id: string;
    label: string;
    value: string;
}

// Referral Source Option
export interface ReferralSourceOption {
    id: string;
    label: string;
    value: string;
}

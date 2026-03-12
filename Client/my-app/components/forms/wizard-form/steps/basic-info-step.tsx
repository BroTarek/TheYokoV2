'use client';

import { ReferralSourceSelect } from '@/components/forms/form-fields/referral-source-select';
import { CountryPhoneSelect } from '@/components/forms/form-fields/country-phone-select';
import { FORM_FIELD_IDS } from '@/components/forms/wizard-form/lib/constants';

interface BasicInfoStepProps {
    firstName: string;
    setFirstName: (value: string) => void;
    lastName: string;
    setLastName: (value: string) => void;
    email: string;
    setEmail: (value: string) => void;
    referralSource: string;
    setReferralSource: (value: string) => void;
    setReferralSourceLabel?: (value: string) => void;
    countryCode: string;
    setCountryCode: (value: string) => void;
    phoneNumber: string;
    setPhoneNumber: (value: string) => void;
}

export function BasicInfoStep({
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    referralSource,
    setReferralSource,
    setReferralSourceLabel,
    countryCode,
    setCountryCode,
    phoneNumber,
    setPhoneNumber,
}: BasicInfoStepProps) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name */}
                <div className="space-y-2">
                    <label
                        htmlFor={FORM_FIELD_IDS.FIRST_NAME}
                        className="block font-medium text-sm text-primary-text transition-colors duration-200"
                    >
                        First Name
                    </label>
                    <div className="relative">
                        <input
                            id={FORM_FIELD_IDS.FIRST_NAME}
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-primary-text 
                  placeholder:text-gray-400 placeholder:text-sm
                  focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500
                  hover:border-gray-400 transition-all duration-200 ease-in-out
                  shadow-sm hover:shadow-md focus:shadow-lg"
                        />
                    </div>
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                    <label
                        htmlFor={FORM_FIELD_IDS.LAST_NAME}
                        className="block font-medium text-sm text-primary-text transition-colors duration-200"
                    >
                        Last Name
                    </label>
                    <div className="relative">
                        <input
                            id={FORM_FIELD_IDS.LAST_NAME}
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-primary-text 
                  placeholder:text-gray-400 placeholder:text-sm
                  focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500
                  hover:border-gray-400 transition-all duration-200 ease-in-out
                  shadow-sm hover:shadow-md focus:shadow-lg"
                        />
                    </div>
                </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
                <label
                    htmlFor={FORM_FIELD_IDS.EMAIL}
                    className="block font-medium text-sm text-primary-text transition-colors duration-200"
                >
                    Email
                </label>
                <div className="relative">
                    <input
                        id={FORM_FIELD_IDS.EMAIL}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-primary-text 
              placeholder:text-gray-400 placeholder:text-sm
              focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500
              hover:border-gray-400 transition-all duration-200 ease-in-out
              shadow-sm hover:shadow-md focus:shadow-lg"
                    />
                    <div className="absolute inset-0 rounded-lg ring-0 ring-gray-500/20 pointer-events-none transition-all duration-200" />
                </div>
            </div>

            <ReferralSourceSelect
                value={referralSource}
                onChange={setReferralSource}
                onLabelChange={setReferralSourceLabel}
                placeholder="Select how you heard about us"
            />

            {/* Phone Number */}
            <div className="space-y-2">
                <label
                    htmlFor={FORM_FIELD_IDS.PHONE}
                    className="block font-medium text-sm text-primary-text transition-colors duration-200"
                >
                    Phone Number
                </label>
                <CountryPhoneSelect
                    value={countryCode}
                    onChange={setCountryCode}
                    phoneValue={phoneNumber}
                    onPhoneChange={setPhoneNumber}
                    placeholder="1551172132"
                />
                <p className="text-xs text-gray-500 pt-1">
                    We'll only contact you about your inquiry
                </p>
            </div>
        </div>
    );
}

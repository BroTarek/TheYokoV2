'use client';

import { DOCUMENT_TYPES, FORM_FIELD_IDS } from '@/components/forms/wizard-form/lib/constants';

interface DocumentsStepProps {
    googleDriveUrl: string;
    setGoogleDriveUrl: (value: string) => void;
}

export function DocumentsStep({ googleDriveUrl, setGoogleDriveUrl }: DocumentsStepProps) {
    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <div className="p-4 bg-sky-50 border border-sky-100 rounded-lg text-sky-800 text-sm">
                    <p className="font-medium mb-1">Upload your documents</p>
                    <p>Please provide a Google Drive link containing your Resume, Portfolio, and any other relevant certificates.</p>
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor={FORM_FIELD_IDS.DOCUMENTS}
                        className="block font-medium text-sm text-primary-text transition-colors duration-200"
                    >
                        Google Drive Link
                    </label>
                    <div className="relative">
                        <input
                            id={FORM_FIELD_IDS.DOCUMENTS}
                            type="url"
                            value={googleDriveUrl}
                            onChange={(e) => setGoogleDriveUrl(e.target.value)}
                            placeholder="https://drive.google.com/..."
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-primary-text 
                  placeholder:text-gray-400 placeholder:text-sm
                  focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500
                  hover:border-gray-400 transition-all duration-200 ease-in-out
                  shadow-sm hover:shadow-md focus:shadow-lg"
                        />
                    </div>
                    <p className="text-xs text-gray-400 mt-1 italic">
                        * Make sure the link is shared so we can view it.
                    </p>
                </div>
            </div>
        </div>
    );
}

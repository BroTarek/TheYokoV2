'use client';

import { ChevronRight } from 'lucide-react';

interface WizardNavigationProps {
    currentStep: number;
    totalSteps: number;
    onNext: () => void;
    onPrevious: () => void;
    onComplete: () => void;
}

export function WizardNavigation({
    currentStep,
    totalSteps,
    onNext,
    onPrevious,
    onComplete,
}: WizardNavigationProps) {
    const isFirstStep = currentStep === 1;
    const isLastStep = currentStep === totalSteps;

    return (
        <div className="flex gap-4 justify-between mt-10">
            <button
                onClick={onPrevious}
                disabled={isFirstStep}
                className={`px-6 py-3 rounded-lg font-semibold transition-all border ${isFirstStep
                    ? 'bg-secondary-grey text-white border-transparent cursor-not-allowed'
                    : 'bg-white text-primary-text border-secondary-grey cursor-pointer hover:bg-gray-50'
                    }`}
                aria-label="Go to previous step"
            >
                Back
            </button>

            <button
                onClick={isLastStep ? onComplete : onNext}
                className={`px-6 py-3 rounded-lg font-semibold text-white transition-all flex items-center gap-2 ${isLastStep
                    ? 'bg-kaizen-red cursor-pointer hover:bg-kaizen-red/90'
                    : 'bg-kaizen-red cursor-pointer hover:bg-kaizen-red/90'
                    }`}
                aria-label={isLastStep ? 'Complete form' : 'Go to next step'}
            >
                {isLastStep ? 'Complete' : 'Next'}
                {!isLastStep && <ChevronRight className="w-4 h-4" />}
            </button>
        </div>
    );
}

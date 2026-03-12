'use client';

interface WizardHeaderProps {
    currentStep: number;
    totalSteps: number;
}

export function WizardHeader({ currentStep, totalSteps }: WizardHeaderProps) {
    return (
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-kaizen-red flex items-center justify-center">
                    <span className="text-white font-semibold text-lg" aria-hidden="true">
                        📝
                    </span>
                </div>
                <div>
                    <h1 className="font-bold text-xlarge text-primary-text">
                        Application Form
                    </h1>
                    <p className="text-small text-secondary-grey">
                        Complete all steps to finish
                    </p>
                </div>
            </div>
            <div className="text-right">
                <p className="font-semibold text-small text-kaizen-red">
                    Step {currentStep} of {totalSteps}
                </p>
            </div>
        </div>
    );
}

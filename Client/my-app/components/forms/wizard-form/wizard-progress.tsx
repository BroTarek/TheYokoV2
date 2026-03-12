'use client';

import { Check } from 'lucide-react';
import { StepConfig } from '@/components/forms/wizard-form/types';

interface WizardProgressProps {
    steps: StepConfig[];
    currentStep: number;
    onStepClick: (stepId: number) => void;
}

export function WizardProgress({
    steps,
    currentStep,
    onStepClick,
}: WizardProgressProps) {
    return (
        <div className="relative">
            {/* Progress Line Layer */}
            <div className="absolute top-5 left-0 w-full h-1 flex px-[10%] z-0">
                <div className="w-full flex">
                    {steps.slice(0, -1).map((step) => (
                        <div
                            key={`line-${step.id}`}
                            className={`flex-1 h-1 transition-colors ${currentStep > step.id ? 'bg-black' : 'bg-kaizen-red/20'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Buttons and Labels Layer */}
            <div className="relative z-10">
                <div className="grid grid-cols-5 gap-2">
                    {steps.map((step) => {
                        const isCompleted = currentStep > step.id;
                        const isCurrent = currentStep === step.id;
                        const isPending = currentStep < step.id;

                        return (
                            <div key={step.id} className="flex flex-col items-center">
                                <button
                                    onClick={() => onStepClick(step.id)}
                                    className={`relative w-10 h-10 rounded-full font-semibold text-sm transition-all mb-3 ${isCompleted
                                        ? 'bg-kaizen-red text-white shadow-lg'
                                        : isCurrent
                                            ? 'bg-kaizen-red text-white shadow-lg ring-4 ring-kaizen-red/30'
                                            : 'bg-white text-muted-foreground border-2 border-secondary-grey'
                                        }`}
                                    aria-label={`Step ${step.id}: ${step.title}`}
                                    aria-current={isCurrent ? 'step' : undefined}
                                >
                                    {isCompleted ? (
                                        <Check className="w-5 h-5 mx-auto" aria-hidden="true" />
                                    ) : (
                                        step.id
                                    )}
                                </button>
                                <div className="text-center px-1">
                                    <p className="font-semibold text-small text-primary-text leading-tight">
                                        {step.title}
                                    </p>
                                    <p className="hidden sm:block text-[11px] text-secondary-grey mt-1 leading-tight">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

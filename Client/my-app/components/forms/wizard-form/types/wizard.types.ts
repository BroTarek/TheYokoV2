// Form step configuration
export interface StepConfig {
    id: number;
    title: string;
    description: string;
}

// Wizard state
export interface WizardState {
    currentStep: number;
    completedSteps: number[];
}

// Wizard actions
export type WizardAction =
    | { type: 'NEXT_STEP' }
    | { type: 'PREVIOUS_STEP' }
    | { type: 'GO_TO_STEP'; payload: number }
    | { type: 'COMPLETE_STEP'; payload: number };

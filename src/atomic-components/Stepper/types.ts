export interface StepperStep {
  id: string;
  label: string;
  disabled?: boolean;
}

export interface StepperProps {
  steps: StepperStep[];
  currentStep: number;
  onStepClick?: (stepId: string) => void;
}

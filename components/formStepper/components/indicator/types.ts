import { StepConfig } from "../../types";

export interface IndicatorProps {
  index: number;
  currentStep: number;
  goToStep: (step: number) => void;
  step: StepConfig;
  size: number;
}

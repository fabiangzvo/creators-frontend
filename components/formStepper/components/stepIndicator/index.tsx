import { JSX, useMemo } from "react";

import Indicator from "../indicator";

import { StepIndicatorProps } from "./types";

import { useCurrentStep, useFormStore } from "@/lib/store/form";

function StepIndicator(props: StepIndicatorProps): JSX.Element {
  const { steps } = props;

  const currentStep = useCurrentStep();
  const goToStep = useFormStore((state) => state.goToStep);

  const items = useMemo(
    () =>
      steps.map((step, index) => (
        <Indicator
          key={step.id}
          currentStep={currentStep}
          goToStep={goToStep}
          index={index}
          size={steps.length - 1}
          step={step}
        />
      )),
    [steps, currentStep, goToStep],
  );

  return <div className="flex items-center justify-between mb-4">{items}</div>;
}

export default StepIndicator;

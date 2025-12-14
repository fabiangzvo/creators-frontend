import { JSX, useMemo } from 'react'

import { useCurrentStep, useFormStore } from '@/lib/store/form';
import Indicator from '../indicator';
import { StepIndicatorProps } from './types';

function StepIndicator(props: StepIndicatorProps): JSX.Element {
  const { steps } = props;

  const currentStep = useCurrentStep();
  const goToStep = useFormStore((state) => state.goToStep);

  const items = useMemo(() => steps
    .map((step, index) =>
      <Indicator
        key={step.id}
        index={index}
        currentStep={currentStep}
        goToStep={goToStep}
        step={step}
        size={steps.length - 1}
      />), [steps, currentStep, goToStep])

  return (
    <div className="flex items-center justify-between mb-4">
      {items}
    </div>
  );
}

export default StepIndicator
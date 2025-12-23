import { JSX, Fragment, useCallback, useMemo } from 'react'
import { Button } from '@heroui/button';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';

import { useCurrentStep, useFormStore, useIsSubmitting, useSteps } from '@/lib/store/form';
import { StepFooterProps } from './types';

export default function StepFooter(props: StepFooterProps): JSX.Element {
  const { onComplete } = props;

  const currentStep = useCurrentStep();
  const isSubmitting = useIsSubmitting();
  const steps = useSteps();
  const nextStep = useFormStore((state) => state.nextStep);
  const prevStep = useFormStore((state) => state.prevStep);

  const { isFirstStep, isLastStep } = useMemo(() =>
  ({
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps.length - 1
  }), [currentStep, steps])


  const handleNextStep = useCallback(async () => await nextStep(onComplete), [nextStep, onComplete])

  return (
    <Fragment>
      <Button
        color='primary'
        className="font-semibold"
        onPress={prevStep}
        isDisabled={isFirstStep || isSubmitting}
        startContent={<ChevronLeft />}
      >
        Anterior
      </Button>
      <Button
        color='primary'
        onPress={handleNextStep}
        isDisabled={isSubmitting}
        isLoading={isSubmitting}
        className="font-semibold"
        endContent={!isLastStep && <ChevronRight />}
      >
        {isLastStep ? 'Finalizar' : 'Siguiente'}
      </Button></Fragment>
  )
}

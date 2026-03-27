import { JSX, Fragment, useCallback, useMemo } from "react";
import { Button } from "@heroui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { StepFooterProps } from "./types";

import {
  useCurrentStep,
  useFormStore,
  useIsSubmitting,
  useSteps,
} from "@/lib/store/form";

export default function StepFooter(props: StepFooterProps): JSX.Element {
  const { onComplete } = props;

  const currentStep = useCurrentStep();
  const isSubmitting = useIsSubmitting();
  const steps = useSteps();
  const nextStep = useFormStore((state) => state.nextStep);
  const prevStep = useFormStore((state) => state.prevStep);

  const { isFirstStep, isLastStep } = useMemo(
    () => ({
      isFirstStep: currentStep === 0,
      isLastStep: currentStep === steps.length - 1,
    }),
    [currentStep, steps],
  );

  const handleNextStep = useCallback(
    async () => await nextStep(onComplete),
    [nextStep, onComplete],
  );

  return (
    <Fragment>
      <Button
        className="font-semibold"
        color="primary"
        isDisabled={isFirstStep || isSubmitting}
        startContent={<ChevronLeft />}
        onPress={prevStep}
      >
        Anterior
      </Button>
      <Button
        className="font-semibold"
        color="primary"
        endContent={!isLastStep && <ChevronRight />}
        isDisabled={isSubmitting}
        isLoading={isSubmitting}
        onPress={handleNextStep}
      >
        {isLastStep ? "Finalizar" : "Siguiente"}
      </Button>
    </Fragment>
  );
}

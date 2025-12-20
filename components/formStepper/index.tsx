"use client"

import React, { JSX } from 'react';
import { motion } from 'framer-motion';
import { useCurrentStep } from '@/lib/store/form';

import { FormStepperProps } from "./types";
import StepContent from './components/stepContent';
import StepIndicator from './components/stepIndicator';
import { constants } from './constants';
import { useFormStore } from '@/lib/store/form';

export function FormStepper(props: FormStepperProps): JSX.Element {
  const { steps, onComplete } = props;

  const currentStep = useCurrentStep();
  const animation = useFormStore((state) => state.animation);

  const currentStepConfig = steps[currentStep];

  return (
    <div className="relative w-full min-h-[70vh]">
      <StepIndicator steps={steps} />
      <motion.div
        key={currentStep}
        transition={{ duration: 0.2 }}
        {...constants[animation]}
      >
        <StepContent stepConfig={currentStepConfig} onComplete={onComplete} />
      </motion.div>
    </div>
  );
}



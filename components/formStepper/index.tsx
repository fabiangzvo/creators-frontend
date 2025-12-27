"use client"

import React, { JSX } from 'react';
import { motion } from 'framer-motion';

import { useFormStore } from '@/lib/store/form';
import { useCurrentStep } from '@/lib/store/form';

import { FormStepperProps } from "./types";
import StepContent from './components/stepContent';
import StepIndicator from './components/stepIndicator';
import { constants } from './constants';
import StepFooter from './components/stepFooter';

export function FormStepper(props: FormStepperProps): JSX.Element {
  const { steps, onComplete, provider } = props;

  const currentStep = useCurrentStep();
  const animation = useFormStore((state) => state.animation);

  const currentStepConfig = steps[currentStep];

  return (
    <div className="relative w-full min-h-[70vh] h-[50vh]">
      <StepIndicator steps={steps} />
      <motion.div
        key={currentStep}
        className='h-full w-full relative'
        transition={{ duration: 0.2 }}
        {...constants[animation]}
      >
        <StepContent stepConfig={currentStepConfig} onComplete={onComplete} provider={provider} />
        <div className='w-full flex justify-between bottom-0 bg-background z-10 py-3'>
          <StepFooter onComplete={onComplete} />
        </div>
      </motion.div>
    </div>
  );
}



"use client"

import React, { JSX } from 'react';

import { useCurrentStep } from '@/lib/store/form';

import { FormStepperProps } from "./types";
import StepContent from './components/stepContent';
import StepIndicator from './components/stepIndicator';


export function FormStepper(props: FormStepperProps): JSX.Element {
  const { steps, onComplete } = props;
  const currentStep = useCurrentStep();

  const currentStepConfig = steps[currentStep];

  return (
    <div className="relative w-full min-h-[70vh]">
      <StepIndicator steps={steps} />
      <StepContent stepConfig={currentStepConfig} onComplete={onComplete} />
    </div>
  );
}



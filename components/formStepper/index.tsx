"use client"

import React, { JSX } from 'react';

import { useCurrentStep } from '@/lib/store/form';

import { FormStepperProps } from "./types";
import StepContent from './components/stepContent';
import StepIndicator from './components/stepIndicator';


export const FormStepper: React.FC<FormStepperProps> = ({ steps, onComplete }): JSX.Element => {
  const currentStep = useCurrentStep();

  const currentStepConfig = steps[currentStep];

  return (
    <div className="relative w-full min-h-[70vh]">
      <StepIndicator steps={steps} />
      <StepContent stepConfig={currentStepConfig} onComplete={onComplete} />
    </div>
  );
};



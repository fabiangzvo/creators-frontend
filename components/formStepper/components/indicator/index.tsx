import { Button } from '@heroui/button';
import { Fragment, JSX } from 'react'
import { twMerge } from 'tailwind-merge';
import { Check } from 'lucide-react';
import { Divider } from '@heroui/divider';

import { IndicatorProps } from './types';

function Indicator(props: IndicatorProps): JSX.Element {
  const { index, currentStep, goToStep, step, size } = props;

  const isCompleted = index < currentStep;
  const isCurrent = index === currentStep;
  const isClickable = index < currentStep;
  const isSolidStyle = isCurrent || isCompleted;
  const showDivider = index < size;

  return (
    <Fragment key={step.id}>
      <div className="flex flex-col items-center flex-1">
        <Button
          color='primary'
          isDisabled={!isClickable}
          onPress={() => isClickable && goToStep(index)}
          variant={isSolidStyle ? 'solid' : 'flat'}
          isIconOnly
          className={twMerge(
            "rounded-full flex items-center justify-center font-semibold transition-all duration-200 text-sm opacity-100",
            !isCompleted && !isCurrent && "cursor-not-allowed",
          )}
        >
          {isCompleted ? <Check /> : index + 1}
        </Button>
        <div className="mt-2 text-center max-w-[100px]">
          <p className={twMerge(
            "text-sm font-semibold",
            isSolidStyle ? 'text-primary-500' : "text-primary-600"
          )}
          >
            {step.stepName || `Paso ${index + 1}`}
          </p>
        </div>
      </div>
      {showDivider && (
        <Divider
          orientation='horizontal'
          className={twMerge(
            "h-0.5 flex-1 mx-2 mb-10 transition-colors duration-200",
            isCompleted ? 'bg-primary-400' : 'bg-gray-300'
          )}
        />
      )}
    </Fragment>
  )
}

export default Indicator
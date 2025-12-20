import { JSX } from 'react';

import { type StepComponentProps } from '@/components/formStepper/types';

function ConfirmationStep(props: StepComponentProps): JSX.Element {
  const { formData } = props;

  return (
    <div>
      <h2>{JSON.stringify(formData)}</h2>
    </div>
  );
}

export default ConfirmationStep
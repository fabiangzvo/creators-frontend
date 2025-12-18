import { JSX } from 'react';

import { useFormData } from '@/lib/store/form';

function ConfirmationStep(): JSX.Element {
  const formData = useFormData();
  return (
    <div>
      <h2>{JSON.stringify(formData)}</h2>
    </div>
  );
}

export default ConfirmationStep
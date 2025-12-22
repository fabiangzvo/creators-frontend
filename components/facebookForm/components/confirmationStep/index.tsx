import { JSX } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Avatar } from '@heroui/avatar';

import { type StepComponentProps } from '@/components/formStepper/types';
import { ArrowBigRight } from 'lucide-react';

function ConfirmationStep(props: StepComponentProps): JSX.Element {
  const { formData } = props;

  return (
    <div>
      <h2>{JSON.stringify(formData)}</h2>
      <div className='grid grid-cols-3 gap-5 w-full items-center justify-center'>
        <Card shadow='sm'>
          <CardHeader className='flex gap-5'>
            <Avatar
              isBordered
              radius="full"
              size="md"
              src={formData.pageInfo.image}
            />
            <h2>{formData.pageInfo.title}</h2>
          </CardHeader>
          <CardBody>
            <p>Estos son los datos que has proporcionado:</p>

          </CardBody>
        </Card>
        <div className='flex justify-center'>
          <ArrowBigRight className='text-primary-500 fill-primary-500 w-14 h-14' />
        </div>
        <Card shadow='sm'>
          <CardHeader className='flex gap-5'>
            <Avatar
              isBordered
              radius="full"
              size="md"
              src={formData.image[0].source}
            />
            <h2>{formData.name}</h2>
          </CardHeader>
          <CardBody>
            <p>Creators</p>

          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default ConfirmationStep
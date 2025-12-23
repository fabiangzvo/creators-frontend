import { JSX, use } from 'react';
import {Chip} from "@heroui/chip";
import { Tooltip } from '@heroui/tooltip';
import { ArrowBigRight, Users } from 'lucide-react';
import {Alert} from "@heroui/alert";

import { type StepComponentProps } from '@/components/formStepper/types';
import { getPages } from '@/actions/facebook';
import useSWR from 'swr';
import ChannelCard from '../channelCard';

function ConfirmationStep(props: StepComponentProps): JSX.Element {
  const { formData } = props;

  const { data: [data] = [], error, isLoading } = useSWR(
    formData.token,
    (token: string) => getPages(token)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Alert className='mb-6' color='primary' description='Al confirmar, se establecerá un enlace permanente entre Tiktrends y tu cuenta. Puedes editar estos parámetros en cualquier momento desde la configuración.' />
      <div className='flex gap-5 w-full items-center justify-center max-md:flex-col'>
        <ChannelCard 
          description={data.about} 
          optionsComponent={
          <Tooltip content="Seguidores">
            <div className='flex gap-2 items-center text-primary-500'>
              <p>{data.followers_count||'no hay seguidores'}</p>
              <Users className='text-primary-500' />
            </div>
          </Tooltip>
          } 
          image={data.picture.data.url}
          pageLink={"https://www.facebook.com/profile.php?id="+data?.id}
          subtitle="Facebook"
          title={data.name}
        />
        <div className='flex justify-center w-1/6 max-md:rotate-90'>
          <ArrowBigRight className='text-primary-500 fill-primary-500 w-14 h-14' />
        </div>
        <ChannelCard
          optionsComponent={<Chip variant='flat' color='success'>Activo</Chip>} 
          image={formData.image[0].source} 
          subtitle="Facebook" 
          title={formData.name}
        />
      </div>
    </div>
  );
}

export default ConfirmationStep
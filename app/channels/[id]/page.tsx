import { JSX } from 'react'
import day from "dayjs";
import { Chip } from '@heroui/chip';
import { Camera, MessageSquareMore, ThumbsUp } from 'lucide-react';

import { getIntegrationById } from '@/actions/integration'
import { statusVariants, StatusVariants } from '@/components/channelList/components/channelCard/variants'
import { Providers } from '@/types/providers';
import ImageWithProvider from '@/components/imageWithProvider';
import OptionActionButton from '@/components/channelList/components/actionButton';
import ChannelTabs from '@/components/channelTabs';
import StatList from '@/components/statList';

import { ChannelPageProps } from './types'

async function Page({ params }: ChannelPageProps): Promise<JSX.Element> {
  const { id } = await params

  const integration = await getIntegrationById(id)

  if (!integration) return <div>Integration not found</div>

  const statList = [
    {
      content: 2500,
      title: "Reacciones",
      Icon: ThumbsUp
    },
    {
      content: 5800661,
      title: "Comentarios",
      Icon: MessageSquareMore
    },
    {
      content: 168,
      title: "Publicaciones",
      Icon: Camera
    }
  ]

  return (
    <div className='container flex flex-col gap-4 w-full mt-2'>
      <div className='flex justify-between'>
        <div className="flex gap-5 w-full">
          <ImageWithProvider
            src={integration.image}
            alt={integration.name}
            provider={integration.provider.name as Providers}
          />
          <section className='flex flex-col'>
            <div className="flex gap-2 w-full">
              <h1 className="font-semibold text-foreground text-2xl line-clamp-1">
                {integration.name}
              </h1>
              <Chip className={statusVariants({ variant: integration.status.name as StatusVariants['variant'] })}>
                {integration.status.name || "Inactive"}
              </Chip>
            </div>
            <article className="text-sm text-foreground/50 font-medium">{integration.provider.name} ·
              Conectado el {day(integration.createdAt).format('D MMM YYYY')}
            </article>
          </section>
        </div>
        <OptionActionButton integrationId={id} status={integration.status.name} />
      </div>
      <StatList items={statList} />
      <ChannelTabs />
    </div>
  )
}

export default Page
import { JSX } from 'react'
import { Image } from '@heroui/image'
import { Badge } from '@heroui/badge'
import { Link } from '@heroui/link'

import { getIntegrationById } from '@/actions/integration'
import { badgeVariants, statusVariants, BadgeVariants, StatusVariants } from '@/components/channelList/components/channelCard/variants'
import { PROVIDER_ICONS } from '@/components/channelForm/components/confirmationStep/constants';
import { Providers } from '@/types/providers';


import { ChannelPageProps } from './types'

async function Page({ params }: ChannelPageProps): Promise<JSX.Element> {
  const { id } = await params

  const integration = await getIntegrationById(id)


  if (!integration) return <div>Integration not found</div>

  const ProviderIcon = PROVIDER_ICONS[integration.provider.name as Providers]

  return (
    <div className='container flex flex-col gap-4 w-full'>
      <div className="flex gap-5 w-full">
        <div>
          <Badge
            variant="solid"
            color="primary"
            placement='bottom-right'
            className={badgeVariants({ variant: integration.provider.name as BadgeVariants['variant'] })}
            content={<ProviderIcon size={20} />}
          >
            <Image
              alt={integration.name}
              height={50}
              width={50}
              radius="sm"
              src={integration.image}
              fallbackSrc={`https://avatars.githubusercontent.com/u/${Math.floor(Math.random() * 1000)}?s=100`}
            />
          </Badge>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <h1 className="font-semibold text-foreground text-2xl line-clamp-1 w-full">
            {integration.name}
            <p className={statusVariants({ variant: integration.status.name as StatusVariants['variant'] })}>
              {integration.status.name || "Inactivo"}
            </p>
          </h1>

        </div>
      </div>
    </div >
  )
}

export default Page
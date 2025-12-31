"use client";

import { JSX } from 'react'
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { Snippet } from "@heroui/snippet";
import { Badge } from "@heroui/badge";

import { PROVIDER_ICONS } from '@/components/channelForm/components/confirmationStep/constants';
import { Providers } from '@/types/providers'

import ActionButton from "../actionButton";
import { ChannelCardProps } from './types'
import { statusVariants, StatusVariants, badgeVariants, BadgeVariants } from './variants'

function ChannelCard(props: ChannelCardProps): JSX.Element {
  const { id, name, status, provider, accountId, apiKey, refresh, image } = props;

  const ProviderIcon = PROVIDER_ICONS[provider.name as Providers]

  return (
    <Card >
      <CardHeader className="flex gap-2 justify-between">
        <div className="flex gap-5 w-full">
          <div>
            <Badge
              variant="solid"
              color="primary"
              placement='bottom-right'
              className={badgeVariants({ variant: provider.name as BadgeVariants['variant'] })}
              content={<ProviderIcon size={20} />}
            >
              <Image
                alt={name}
                height={50}
                width={50}
                radius="sm"
                src={image}
                fallbackSrc={`https://avatars.githubusercontent.com/u/${Math.floor(Math.random() * 1000)}?s=100`}
              />
            </Badge>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <p className="text-md line-clamp-1 w-full">{name}</p>
            <p className={statusVariants({ variant: status.name as StatusVariants['variant'] })}>
              {status.name || "Inactivo"}
            </p>
          </div>
        </div>
        <ActionButton integrationId={id} refresh={refresh} status={status.name} />
      </CardHeader>
      <CardBody className="flex w-full">
        <Snippet
          classNames={{ base: "w-full", pre: "w-[95%] overflow-hidden pl-1", symbol: "hidden" }}
          size="sm"
          color="primary"
          variant="flat"
          tooltipProps={{ content: "Copiar llave" }}
        >
          {apiKey}
        </Snippet>
      </CardBody>
    </Card>
  )
}

export default ChannelCard
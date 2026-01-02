"use client";

import { JSX } from 'react'
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Snippet } from "@heroui/snippet";
import { Link } from '@heroui/link';

import { Providers } from '@/types/providers'
import ImageWithProvider from '@/components/imageWithProvider';

import ActionButton from "../actionButton";
import { ChannelCardProps } from './types'
import { statusVariants, StatusVariants } from './variants'

function ChannelCard(props: ChannelCardProps): JSX.Element {
  const { id, name, status, provider, apiKey, refresh, image } = props;

  return (
    <Card >
      <CardHeader className="flex gap-2 justify-between items-start">
        <div className="flex gap-5 w-full">
          <ImageWithProvider src={image} alt={name} provider={provider.name as Providers} />
          <div className="flex flex-col gap-1 w-full">
            <Link
              href={`/channels/${id}`}
              className="font-semibold text-foreground text-md line-clamp-1 w-full"
            >
              {name}
            </Link>
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
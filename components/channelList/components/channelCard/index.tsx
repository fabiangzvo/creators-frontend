"use client";

import { JSX } from 'react'
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Image } from "@heroui/image";
import { Snippet } from "@heroui/snippet";

import ActionButton from "../actionButton";
import { ChannelCardProps } from './types'

function ChannelCard(props: ChannelCardProps): JSX.Element {
  const { id, name, status, provider, accountId, apiKey, refresh } = props;

  return (
    <Card className="max-w-[400px]" >
      <CardHeader className="flex gap-3 justify-between">
        <div className="flex gap-3">
          <Image
            alt={name}
            height={40}
            radius="sm"
            src={`https://avatars.githubusercontent.com/u/${Math.floor(Math.random() * 1000)}?s=100`}
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md line-clamp-1">{name}</p>
            <p className="text-small text-primary-500">{status.name || "Inactivo"}</p>
          </div>
        </div>
        <ActionButton integrationId={id} refresh={refresh} />
      </CardHeader>
      <Divider />
      <CardBody className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <p className="font-semibold">Proveedor</p>
          <p>{provider.name}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-semibold">Account</p>
          <p>{accountId}</p>
        </div>
        <div className="col-span-2 flex flex-col gap-1">
          <p className="font-semibold">Llave del api</p>
          <Snippet
            classNames={{ base: "w-full", pre: "w-[95%] overflow-hidden pl-1", symbol: "hidden" }}
            size="sm"
            color="primary"
            variant="flat"
            tooltipProps={{ content: "Copiar llave del api" }}
          >
            {apiKey}
          </Snippet>
        </div>
      </CardBody>
    </Card>
  )
}

export default ChannelCard
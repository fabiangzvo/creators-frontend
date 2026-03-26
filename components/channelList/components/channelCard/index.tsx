"use client";

import { JSX } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Snippet } from "@heroui/snippet";
import { Link } from "@heroui/link";

import ActionButton from "../actionButton";

import { ChannelCardProps } from "./types";
import { statusVariants, StatusVariants } from "./variants";

import ImageWithProvider from "@/components/imageWithProvider";
import { Providers } from "@/types/providers";

function ChannelCard(props: ChannelCardProps): JSX.Element {
  const { id, name, status, provider, apiKey, refresh, image } = props;

  return (
    <Card>
      <CardHeader className="flex gap-2 justify-between items-start">
        <div className="flex gap-5 w-full">
          <ImageWithProvider
            alt={name}
            provider={provider.name as Providers}
            src={image}
          />
          <div className="flex flex-col gap-1 w-full">
            <Link
              className="font-semibold text-foreground text-md line-clamp-1 w-full"
              href={`/channels/${id}`}
            >
              {name}
            </Link>
            <p
              className={statusVariants({
                variant: status.name as StatusVariants["variant"],
              })}
            >
              {status.name || "Inactivo"}
            </p>
          </div>
        </div>
        <ActionButton
          integrationId={id}
          refresh={refresh}
          status={status.name}
        />
      </CardHeader>
      <CardBody className="flex w-full">
        <Snippet
          classNames={{
            base: "w-full",
            pre: "w-[95%] overflow-hidden pl-1",
            symbol: "hidden",
          }}
          color="primary"
          size="sm"
          tooltipProps={{ content: "Copiar llave" }}
          variant="flat"
        >
          {apiKey}
        </Snippet>
      </CardBody>
    </Card>
  );
}

export default ChannelCard;

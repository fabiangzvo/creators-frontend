import { JSX } from "react";
import day from "dayjs";
import { Chip } from "@heroui/chip";
import { Camera, MessageSquareMore, ThumbsUp } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { ChannelPageProps } from "./types";

import { getIntegrationById } from "@/actions/integration";
import {
  statusVariants,
  StatusVariants,
} from "@/components/channelList/components/channelCard/variants";
import { Providers } from "@/types/providers";
import ImageWithProvider from "@/components/imageWithProvider";
import ChannelTabs from "@/components/channelTabs";
import StatList from "@/components/statList";
import { auth } from "@/lib/auth";

async function Page({ params }: ChannelPageProps): Promise<JSX.Element> {
  const { id } = await params;

  const integration = await getIntegrationById(id);

  if (!integration) return <div>Integration not found</div>;

  const {
    provider: { name: providerName },
  } = integration;

  const session = await auth.api.getAccessToken({
    headers: await headers(),
    body: {
      providerId: providerName === "youtube" ? "google" : providerName,
    },
  });

  if (!session?.accessToken) return redirect("/channels");

  const statList = [
    {
      content: 2500,
      title: "Reacciones",
      Icon: ThumbsUp,
    },
    {
      content: 5800661,
      title: "Comentarios",
      Icon: MessageSquareMore,
    },
    {
      content: 168,
      title: "Publicaciones",
      Icon: Camera,
    },
  ];

  return (
    <div className="container flex flex-col gap-4 w-full mt-2">
      <div className="flex gap-5 w-full">
        <ImageWithProvider
          alt={integration.name}
          provider={integration.provider.name as Providers}
          src={integration.image}
        />
        <section className="flex flex-col">
          <div className="flex gap-2 w-full">
            <h1 className="font-semibold text-foreground text-2xl line-clamp-1">
              {integration.name}
            </h1>
            <Chip
              className={statusVariants({
                variant: integration.status.name as StatusVariants["variant"],
              })}
            >
              {integration.status.name || "Inactive"}
            </Chip>
          </div>
          <article className="text-sm text-foreground/50 font-medium">
            {integration.provider.name} · Conectado el{" "}
            {day(integration.createdAt).format("D MMM YYYY")}
          </article>
        </section>
      </div>
      <StatList items={statList} />
      <ChannelTabs integration={integration} token={session.accessToken!} />
    </div>
  );
}

export default Page;

import { JSX } from "react";
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

import { auth } from '@/lib/auth'
import Form from "@/components/channelForm";

import { ChannelProps } from "./types";
import { PROVIDER_ACCOUNT_LIST } from "./constants";

async function Channels({ params }: ChannelProps): Promise<JSX.Element> {
  const { provider } = await params;

  const session = await auth.api.getAccessToken({
    headers: await headers(),
    body: {
      providerId: provider === 'youtube' ? "google" : provider
    },
  })

  if (!session?.accessToken) return redirect("/channels/create")

  return (
    <div className="container mt-2">
      <Form
        provider={provider}
        accessToken={session.accessToken}
        fetchAllowedAccounts={PROVIDER_ACCOUNT_LIST[provider]}
      />
    </div>
  );
}

export default Channels;
import { JSX } from "react";
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

import { auth } from '@/lib/auth'
import Form from "@/components/channelForm";

import { ChannelProps } from "./types";
import { PROVIDERS_FORM } from "./constants";

async function Channels({ params }: ChannelProps): Promise<JSX.Element> {
  const { provider } = await params;

  const session = await auth.api.getAccessToken({
    headers: await headers(),
    body: {
      providerId: provider === 'youtube' ? "google" : provider
    },
  })

  if (!session?.accessToken) return redirect("/channels/create")

  return (<div className="container mt-2">
    <Form provider={provider} accessToken={session.accessToken} fetchAllowedAccounts={PROVIDERS_FORM[provider]} />
  </div>);
}

export default Channels;
import { JSX } from "react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { ChannelProps } from "./types";
import { PROVIDER_ACCOUNT_LIST } from "./constants";

import { auth } from "@/lib/auth";
import Form from "@/components/channelForm";

async function Channels({ params }: ChannelProps): Promise<JSX.Element> {
  const { provider } = await params;

  const session = await auth.api.getAccessToken({
    headers: await headers(),
    body: {
      providerId: provider === "youtube" ? "google" : provider,
    },
  });

  if (!session?.accessToken) return redirect("/channels/create");

  return (
    <div className="container mt-2">
      <Form
        accessToken={session.accessToken}
        fetchAllowedAccounts={PROVIDER_ACCOUNT_LIST[provider]}
        provider={provider}
      />
    </div>
  );
}

export default Channels;

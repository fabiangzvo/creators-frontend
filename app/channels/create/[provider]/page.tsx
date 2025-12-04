import { FunctionComponent, JSX } from "react";

import { Providers } from "@/types/providers";
import FacebookForm from "@/components/facebookForm";
import InstagramForm from "@/components/instagramForm";
import YoutubeForm from "@/components/youtubeForm";
import TiktokForm from "@/components/tiktokForm";

import { ChannelProps } from "./types";

const providers: Record<Providers, FunctionComponent> = {
  facebook: FacebookForm,
  instagram: InstagramForm,
  youtube: YoutubeForm,
  tiktok: TiktokForm
}

async function Channels({ params }: ChannelProps): Promise<JSX.Element> {
  const { provider } = await params;

  const Form = providers[provider]

  return (<div className="container">
    <Form />
  </div>);
}

export default Channels;
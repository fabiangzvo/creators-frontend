import { JSX } from "react";

import { ChannelProps } from "./types";
import { PROVIDERS_FORM } from "./constants";

async function Channels({ params }: ChannelProps): Promise<JSX.Element> {
  const { provider } = await params;

  const Form = PROVIDERS_FORM[provider]

  return (<div className="container mt-2">
    <Form />
  </div>);
}

export default Channels;
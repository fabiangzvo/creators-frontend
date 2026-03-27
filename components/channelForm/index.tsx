import { JSX } from "react";

import Form from "./components/form";

import { FormProviderProps } from "@/types/providers";

async function ChannelForm(props: FormProviderProps): Promise<JSX.Element> {
  const { accessToken, fetchAllowedAccounts, provider } = props;

  const data = await fetchAllowedAccounts(accessToken);

  if (typeof data === "string") return <div>{data}</div>;

  return (
    <div className="px-4">
      <Form pages={data} provider={provider} token={accessToken} />
    </div>
  );
}

export default ChannelForm;

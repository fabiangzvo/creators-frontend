import { JSX } from "react";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";

interface Props {
  params: Promise<{ provider: string }>;
}

async function Channels({ params }: Props): Promise<JSX.Element> {
  const { provider } = await params;
  console.log(provider)
  const session = await auth.api.getSession({ headers: await headers() })


  console.log(session)
  return (<div className=" h-full w-full">Channels
    {JSON.stringify(session)}
  </div>);
}

export default Channels;
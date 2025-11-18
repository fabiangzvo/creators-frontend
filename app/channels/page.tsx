"use client"

import { JSX } from "react";

import { authClient } from "@/lib/auth-client";

function Channels(): JSX.Element {
  const client = authClient.useSession();

  console.log(client)
  return (<div className=" h-full w-full">Channels
    {JSON.stringify(client)}

  </div>);
}

export default Channels;
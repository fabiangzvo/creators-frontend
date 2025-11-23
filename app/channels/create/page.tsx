import { JSX } from "react";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { SignInProviderButton } from "@/components/signInProviderButton";
import { providers } from "@/app/channels/constants";


async function Channels(): Promise<JSX.Element> {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return (<div className="px-4 container">
    <div className="flex flex-col">
      <h1 className="text-2xl font-semibold">Seleccionar plataforma</h1>
      <p className="text-foreground/70">Selecciona la red social que deseas conectar a creators</p>
    </div>
    <div className="grid grid-cols-4 gap-6 mt-8">
      {providers.map((provider) => (
        <SignInProviderButton
          key={provider.key}
          name={provider.label}
          provider={provider.key}
          icon={provider.icon}
        />
      ))}
    </div>
  </div>);
}

export default Channels;
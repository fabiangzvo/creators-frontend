import { JSX } from "react";

import { SignInProviderButton } from "@/components/signInProviderButton";
import { ALLOWED_PROVIDERS } from "@/app/channels/constants";

async function Channels(): Promise<JSX.Element> {
  const allowedProviders = ALLOWED_PROVIDERS.map((provider) => (
    <SignInProviderButton
      key={provider.key}
      name={provider.label}
      provider={provider.key}
      icon={provider.icon}
    />
  ))

  return (
    <div className="px-4 container">
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold">Seleccionar plataforma</h1>
        <p className="text-foreground/70">Selecciona la red social que deseas conectar a creators</p>
      </div>
      <div className="grid grid-cols-4 gap-6 mt-8">
        {allowedProviders}
      </div>
    </div >
  );
}

export default Channels;
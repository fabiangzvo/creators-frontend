
"use client"

import { useCallback, JSX, useMemo } from "react";
import { Card } from "@heroui/card";

import { authClient } from '@/lib/auth-client';

import { SignInProviderButtonProps } from "./types";
import { IconContainerVariants, iconContainerVariants, iconVariants } from "./variants";
import { PROVIDER_ICONS } from "./constants";


export function SignInProviderButton(props: SignInProviderButtonProps): JSX.Element {
  const { name, provider, icon } = props;

  const handleClick = useCallback(async () => {
    switch (provider) {
      case "instagram":
        await authClient.signIn.oauth2({ providerId: provider, callbackURL: `/channels/create/${provider}` })
        break;
      case "youtube":
        await authClient.signIn.social({ provider: "google", callbackURL: `/channels/create/${provider}` })
        break
      default:
        await authClient.signIn.social({ provider, callbackURL: `/channels/create/${provider}` })
    }
  },
    [name, provider])

  const backgroundIcon = useMemo(() => {
    if (!provider) return null;

    const IconComponent = PROVIDER_ICONS[provider];

    return <IconComponent
      isFilled
      className={iconVariants({ variant: provider })}
    />;
  }, [provider])

  return (
    <Card
      key={provider}
      isBlurred
      isPressable
      className="relative group cursor-pointer rounded-2xl p-6 h-52 transition-all duration-300 ease-out flex flex-col items-center justify-between overflow-hidden select-none animate-enter [animation-delay:500ms] dark:bg-foreground/10"
      shadow="sm"
      onPress={handleClick}
    >
      {/* <div
        className={cardVariants({ variant: provider as CardVariants["variant"] })}
      /> */}
      <div
        className="absolute -bottom-8 -right-8 w-40 h-40 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500 text-primary-300 dark:text-primary-600 pointer-events-none transform rotate-12 opacity-10"
      >
        {backgroundIcon}
      </div>

      <div
        className={iconContainerVariants({ variant: provider as IconContainerVariants["variant"] })}
      >
        {icon}
      </div>

      <div className="relative z-10 text-center">
        <h3 className="text-2xl font-semibold mb-1 tracking-wide">{name}</h3>
        <p
          className="text-xs font-medium text-zinc-600 uppercase tracking-widest opacity-0 transition-all duration-500 group-hover:opacity-100 dark:text-zinc-400"
        >
          Conectar Perfil
        </p>
      </div>
    </Card >
  )
}

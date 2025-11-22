
"use client"

import { useCallback, JSX } from "react";
import { Button } from '@heroui/button'

import { authClient } from '@/lib/auth-client';

import { SignInProviderButtonProps } from "./types";


export function SignInProviderButton(props: SignInProviderButtonProps): JSX.Element {
  const { name, provider, icon } = props;

  const handleClick = useCallback(async () => await authClient.signIn.social({ provider, callbackURL: `/channels/create/${provider}`, }),
    [name, provider])

  return (
    <Button onPress={handleClick} key={provider} variant="bordered" className="h-28">
      <div className="flex flex-col justify-center items-center gap-3">
        <div className="w-12 h-12 bg-primary-100/50 rounded-full flex items-center justify-center">{icon}</div>
        <p className="font-medium text-base">{name}</p>
      </div>
    </Button>
  )
}

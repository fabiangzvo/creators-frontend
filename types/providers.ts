import { ComponentType, FunctionComponent } from "react";

import { IconProps } from "@/components/icons/types";
import { ListOption } from "@/components/formStepper/types";
import { ChannelCardProps } from "@/components/facebookForm/components/channelCard/types";

export type Providers = "facebook" | "instagram" | "youtube" | "tiktok";

export interface Provider {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export type ProvidersIconMap = Record<Providers, ComponentType<IconProps>>;
export type ProvidersComponentMap<T = any> = Record<
  Providers,
  FunctionComponent<T>
>;

export type FetchAllowedAccountsFunc = (
  accessToken: string,
) => Promise<string | ListOption[]>;

export type ProvidersWithDetailFetchFunc = (
  accessToken: string,
) => Promise<ChannelCardProps>;

export interface FormProviderProps {
  accessToken: string;
  provider: Providers;
  fetchAllowedAccounts: FetchAllowedAccountsFunc;
}

export type ProvidersWithFetch = Record<Providers, FetchAllowedAccountsFunc>;
export type ProvidersWithDetailFetch = Record<
  Providers,
  ProvidersWithDetailFetchFunc
>;

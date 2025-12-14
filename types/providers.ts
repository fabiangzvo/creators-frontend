import { ComponentType, FunctionComponent } from "react";

import { IconProps } from "@/components/icons/types";

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

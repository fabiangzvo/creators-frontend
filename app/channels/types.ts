import { JSX } from "react";

import { Providers } from "@/types/providers";

export type ProviderConfig = {
  key: Providers;
  label: string;
  icon: JSX.Element;
};

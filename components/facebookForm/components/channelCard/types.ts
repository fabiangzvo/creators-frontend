import { ReactNode } from "react";

import { Providers } from "@/types/providers";

export interface ChannelCardProps {
  image: string;
  title: string;
  subtitle: string | ReactNode;
  optionsComponent?: ReactNode;
  description?: string;
  pageLink?: string;
  provider: Providers;
}

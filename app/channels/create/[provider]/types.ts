import { Providers } from "@/types/providers";

export interface ChannelProps {
  params: Promise<{ provider: Providers }>;
}

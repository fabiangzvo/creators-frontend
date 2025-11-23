import { Provider } from "@/types/providers";

export interface ChannelProps {
  params: Promise<{ provider: Provider }>;
}

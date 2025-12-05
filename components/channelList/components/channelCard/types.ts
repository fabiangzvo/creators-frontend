import { Integration } from "@/types/integrations";

export interface ChannelCardProps extends Integration {
  refresh: () => void;
}

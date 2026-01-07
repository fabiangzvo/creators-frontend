import { Providers } from "@/types/providers";

export interface GeneralTabProps {
  apiKey: string;
  description: string;
  accountId: string;
  provider: Providers;
  token: string;
}

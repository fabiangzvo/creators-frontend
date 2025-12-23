import { Provider } from "./providers";
import { Status } from "./status";

export interface Integration {
  id: string;
  name: string;
  accountId: string;
  apiKey: string;
  enabled: boolean;
  softRemoved: boolean;
  settings: any | null;
  status: Status;
  provider: Provider;
  createdAt: string;
  updatedAt: string;
  image: string;
  token: string;
}

export interface IntegrationBody {
  name: string;
  accountId: string;
  providerId: string;
  userId: string;
  image: string;
  token: string;
}

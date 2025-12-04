import { AxiosInstance } from "axios";

import { Instances } from "../../types/axios";
import { createAxiosInstance } from "./instance";

export const apiIntegration = createAxiosInstance(
  process.env.NEXT_PUBLIC_INTEGRATION_URL || "http://localhost:8081"
);
export const apiFacebook = createAxiosInstance(
  process.env.NEXT_PUBLIC_FACEBOOK_URL || "http://localhost:8080"
);

export const apiClients: Record<Instances, AxiosInstance> = {
  integration: apiIntegration,
  facebook: apiFacebook,
};

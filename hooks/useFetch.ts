import useSWR, { SWRConfiguration, SWRResponse } from "swr";
import { AxiosInstance } from "axios";
import { Instances } from "@/types/axios";
import { apiClients } from "@/lib/axios";

interface UseFetchOptions extends SWRConfiguration {
  api: Instances;
  queryParams?: Record<string, any>;
}

function urlBuilder(baseUrl: string, params?: Record<string, any>): string {
  if (!params || Object.keys(params).length === 0) return baseUrl;

  const queryString = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      if (Array.isArray(value)) {
        value.forEach((v) => queryString.append(key, v));
      } else {
        queryString.append(key, String(value));
      }
    }
  });

  return `${baseUrl}?${queryString.toString()}`;
}

const dataFetcher = (axiosInstance: AxiosInstance) => async (url: string) => {
  const { data } = await axiosInstance.get(url);

  return data;
};

export const useFetch = <T>(
  url: string | null,
  options: UseFetchOptions
): SWRResponse<T> => {
  const { api = "integration", queryParams, ...swrOptions } = options;

  const axiosInstance = apiClients[api];

  const fullUrl = url ? urlBuilder(url, queryParams) : null;

  return useSWR<T>(fullUrl, dataFetcher(axiosInstance), {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
    ...swrOptions,
  });
};

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

  const flattenParams = (obj: Record<string, any>, prefix = "") => {
    Object.entries(obj).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") return;

      const fullKey = prefix ? `${prefix}[${key}]` : key;

      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (typeof item === "object" && item !== null) {
            flattenParams({ [key]: item }, prefix);
          } else {
            queryString.append(fullKey, String(item));
          }
        });
      } else if (typeof value === "object" && value !== null) {
        queryString.append(fullKey, JSON.stringify(value));
      } else {
        queryString.append(fullKey, String(value));
      }
    });
  };

  flattenParams(params);
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

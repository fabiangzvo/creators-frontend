import { ProvidersWithFetch } from "@/types/providers";
import { getFacebookAccountInfo } from "@/actions/facebook";
import { getInstagramAccount } from "@/actions/instagram";
import { getTiktokAccountInfo } from "@/actions/tiktok";

export const PROVIDERS_FORM: ProvidersWithFetch = {
  facebook: getFacebookAccountInfo,
  instagram: getInstagramAccount,
  youtube: (token: string) => Promise.resolve([]),
  tiktok: getTiktokAccountInfo,
};

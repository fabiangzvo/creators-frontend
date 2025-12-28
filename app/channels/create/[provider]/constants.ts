import { ProvidersWithFetch } from "@/types/providers";
import { getFacebookAccountInfo } from "@/actions/facebook";
import { getInstagramAccount } from "@/actions/instagram";
import { getTiktokAccountInfo } from "@/actions/tiktok";
import { getYoutubeAccountInfo } from "@/actions/youtube";

export const PROVIDER_ACCOUNT_LIST: ProvidersWithFetch = {
  facebook: getFacebookAccountInfo,
  instagram: getInstagramAccount,
  youtube: getYoutubeAccountInfo,
  tiktok: getTiktokAccountInfo,
};

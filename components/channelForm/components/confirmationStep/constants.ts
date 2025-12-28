import { ProvidersWithDetailFetch } from "@/types/providers";
import { getFacebookChannelProps } from "@/actions/facebook";
import { getInstagramChannelProps } from "@/actions/instagram";
import { getTiktokChannelProps } from "@/actions/tiktok";
import { getYoutubeChannelProps } from "@/actions/youtube";

export const PROVIDER_ACCOUNT_LIST: ProvidersWithDetailFetch = {
  facebook: getFacebookChannelProps,
  instagram: getInstagramChannelProps,
  youtube: getYoutubeChannelProps,
  tiktok: getTiktokChannelProps,
};

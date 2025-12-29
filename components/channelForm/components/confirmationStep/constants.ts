import { ProvidersIconMap, ProvidersWithDetailFetch } from "@/types/providers";
import { getFacebookChannelProps } from "@/actions/facebook";
import { getInstagramChannelProps } from "@/actions/instagram";
import { getTiktokChannelProps } from "@/actions/tiktok";
import { getYoutubeChannelProps } from "@/actions/youtube";
import { FacebookIcon } from "@/components/icons/facebook";
import { InstagramIcon } from "@/components/icons/instagram";
import { YoutubeIcon } from "@/components/icons/youtube";
import { TiktokIcon } from "@/components/icons/tiktok";

export const PROVIDER_ACCOUNT_LIST: ProvidersWithDetailFetch = {
  facebook: getFacebookChannelProps,
  instagram: getInstagramChannelProps,
  youtube: getYoutubeChannelProps,
  tiktok: getTiktokChannelProps,
};

export const PROVIDER_ICONS: ProvidersIconMap = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  tiktok: TiktokIcon,
};

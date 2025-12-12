import { Providers } from "@/types/providers";

import { TiktokIcon } from "../icons/tiktok";
import { YoutubeIcon } from "../icons/youtube";
import { InstagramIcon } from "../icons/instagram";
import { FacebookIcon } from "../icons/facebook";
import { IconProps } from "../icons/types";

export const PROVIDER_ICONS: Record<
  Providers,
  React.ComponentType<IconProps>
> = {
  tiktok: TiktokIcon,
  youtube: YoutubeIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
};

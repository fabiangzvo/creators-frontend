import { FacebookIcon } from "@/components/icons/facebook";
import { InstagramIcon } from "@/components/icons/instagram";
import { YoutubeIcon } from "@/components/icons/youtube";
import { TiktokIcon } from "@/components/icons/tiktok";

import { ProviderConfig } from "./types";

export const ALLOWED_PROVIDERS: ProviderConfig[] = [{
  key: "facebook",
  label: "Facebook",
  icon: <FacebookIcon className="text-background" />
},
{
  key: "instagram",
  label: "Instagram",
  icon: <InstagramIcon className="text-background" />
},
{
  key: "youtube",
  label: "Youtube",
  icon: <YoutubeIcon className="stroke-background" />
},
{
  key: "tiktok",
  label: "Tiktok",
  icon: <TiktokIcon className="text-background" />
}
]
import { FacebookIcon } from "@/components/icons/facebook";
import { InstagramIcon } from "@/components/icons/instagram";
import { YoutubeIcon } from "@/components/icons/youtube";
import { TiktokIcon } from "@/components/icons/tiktok";

export const providers = [{
  key: "facebook",
  label: "Facebook",
  icon: <FacebookIcon className="text-primary-500" />
},
{
  key: "instagram",
  label: "Instagram",
  icon: <InstagramIcon className="text-primary-500" />
},
{
  key: "youtube",
  label: "Youtube",
  icon: <YoutubeIcon className="stroke-primary-500" />
},
{
  key: "tiktok",
  label: "Tiktok",
  icon: <TiktokIcon className="fill-primary-500" />
}
]
import { Globe } from "lucide-react";

import { FacebookIcon } from "../../../icons/facebook";
import { InstagramIcon } from "../../../icons/instagram";
import { TiktokIcon } from "../../../icons/tiktok";
import { YoutubeIcon } from "../../../icons/youtube";

export const STRATEGIES_LIST = [
  {
    id: "global",
    title: "Estrategia Global",
    description: "FB, IG, YT",
    icon: Globe,
    channels: [FacebookIcon, InstagramIcon, YoutubeIcon, TiktokIcon],
  },
  {
    id: "visuals",
    title: "Solo Visuales",
    description: "INSTAGRAM & Youtube",
    icon: InstagramIcon,
    channels: [InstagramIcon, YoutubeIcon],
  },
];

import { JSX } from "react";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { FacebookIcon } from "@/components/icons/facebook";
import { InstagramIcon } from "@/components/icons/instagram";
import { YoutubeIcon } from "@/components/icons/youtube";
import { TiktokIcon } from "@/components/icons/tiktok";
import { SignInProviderButton } from "@/components/signInProviderButton";

const providers = [{
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

async function Channels(): Promise<JSX.Element> {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return (<div className="px-4">
    <h1 className="text-2xl font-semibold">Connect new channel</h1>
    <p className="text-foreground/70">Choose the social media platform you want to connect</p>
    <div className="grid grid-cols-5 gap-6 mt-4">
      {providers.map((provider) => (
        <SignInProviderButton
          key={provider.key}
          name={provider.label}
          provider={provider.key}
          icon={provider.icon}
        />
      ))}
    </div>
  </div>);
}

export default Channels;
import axios from "axios";

import { InstagramPageInfo } from "@/types/instagram";
import { ListOption } from "@/components/formStepper/types";
import { ChannelCardProps } from "@/components/facebookForm/components/channelCard/types";

export async function getAccountInfo(
  access_token: string
): Promise<InstagramPageInfo> {
  try {
    const response = await axios.get<InstagramPageInfo>(
      "https://graph.instagram.com/v24.0/me",
      {
        params: {
          access_token,
          fields:
            "id,username,account_type,media_count,name,profile_picture_url,followers_count,biography,website",
        },
      }
    );

    return response.data as InstagramPageInfo;
  } catch (e) {
    console.error(e);

    return {} as InstagramPageInfo;
  }
}

export async function getInstagramAccount(
  accessToken: string
): Promise<string | ListOption[]> {
  const data = await getAccountInfo(accessToken);

  if (Object.keys(data).length > 0) throw new Error("No data found");

  return [
    {
      image: data.profile_picture_url,
      title: data.username,
      value: data.id,
    },
  ];
}

export async function getInstagramChannelProps(
  accessToken: string
): Promise<ChannelCardProps> {
  const data = await getAccountInfo(accessToken);

  if (!data || !data.id) throw new Error("No tienes páginas disponibles");

  return {
    image: data.profile_picture_url,
    title: data.username,
    subtitle: "Instagram",
    description: data.biography,
    pageLink: `https://www.instagram.com/${data.username}`,
    optionsComponent: `${data.followers_count} seguidor(es)`,
  };
}

import axios from "axios";

import { TiktokAccountInfo } from "@/types/tiktok";
import { ListOption } from "@/components/formStepper/types";
import { ChannelCardProps } from "@/components/facebookForm/components/channelCard/types";

export async function getAccountInfo(
  accessToken: string
): Promise<TiktokAccountInfo> {
  try {
    const response = await axios.get<{ data: TiktokAccountInfo }>(
      "https://open.tiktokapis.com/v2/user/info/",
      {
        params: {
          fields:
            "open_id,union_id,display_name,username,avatar_url,bio_description,profile_deep_link,is_verified,follower_count,following_count,likes_count,video_count",
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.data as TiktokAccountInfo;
  } catch (e) {
    console.error(e);

    return {} as TiktokAccountInfo;
  }
}

export async function getTiktokAccountInfo(
  accessToken: string
): Promise<string | ListOption[]> {
  const data = await getAccountInfo(accessToken);

  if (!data || !data?.user)
    return "No nos diste los permisos necesarios para obtener la información desde tiktok";

  return [
    {
      image: data.user.avatar_url,
      title: data.user.username,
      value: data.user.open_id,
    },
  ];
}

export async function getTiktokChannelProps(
  accessToken: string
): Promise<ChannelCardProps> {
  const data = await getAccountInfo(accessToken);

  if (!data || !data?.user?.open_id)
    throw new Error("No se pudo obtener la información de TikTok");

  return {
    image: data.user.avatar_url,
    title: data.user.username,
    subtitle: "Instagram",
    description: data.user.bio_description,
    pageLink: `https://www.tiktok.com/@${data.user.username}`,
    optionsComponent: `${data.user.follower_count} seguidor(es)`,
  };
}

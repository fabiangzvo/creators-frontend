import axios from "axios";

import { TiktokAccountInfo } from "@/types/tiktok";
import { ListOption } from "@/components/formStepper/types";

export async function getAccountInfo(
  accessToken: string
): Promise<TiktokAccountInfo> {
  try {
    const response = await axios.get<{ data: TiktokAccountInfo }>(
      "https://www.googleapis.com/youtube/v3/channels",
      {
        params: {
          part: "snippet,statistics,brandingSettings",
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

export async function getYoutubeAccountInfo(
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

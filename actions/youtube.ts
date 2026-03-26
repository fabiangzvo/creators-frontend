import axios from "axios";

import { YouTubeChannelInfo } from "@/types/youtube";
import { ListOption } from "@/components/formStepper/types";
import { ChannelCardProps } from "@/components/facebookForm/components/channelCard/types";

export async function getAccountInfo(
  accessToken: string,
): Promise<YouTubeChannelInfo> {
  try {
    const response = await axios.get<YouTubeChannelInfo>(
      "https://www.googleapis.com/youtube/v3/channels",
      {
        params: {
          part: "snippet,statistics,topicDetails",
          mine: "true",
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data as YouTubeChannelInfo;
  } catch (e) {
    console.error("YouTube API error:", e);

    return {} as YouTubeChannelInfo;
  }
}

export async function getYoutubeAccountInfo(
  accessToken: string,
): Promise<string | ListOption[]> {
  const data = await getAccountInfo(accessToken);

  if (!data || data?.items?.length <= 0)
    return "No nos diste los permisos necesarios para obtener la información desde tiktok";

  return data.items.map((channel) => {
    return {
      image: channel.snippet.thumbnails?.high?.url || "",
      title: channel.snippet.title || "Canal de YouTube",
      value: channel.id,
    };
  });
}

export async function getYoutubeChannelProps(
  accessToken: string,
): Promise<ChannelCardProps> {
  const data = await getAccountInfo(accessToken);

  if (!data || data?.items.length <= 0)
    throw new Error("No se pudo obtener la información de YouTube");

  const [channel] = data.items;

  return {
    image: channel.snippet.thumbnails?.high?.url || "",
    title: channel.snippet.title || "Canal de YouTube",
    subtitle: "YouTube",
    description: data.items[0].snippet.description || "Sin descripción",
    pageLink: `https://www.youtube.com/channel/${data.items[0].id}`,
    optionsComponent: data.items[0].statistics.subscriberCount,
    provider: "youtube",
  };
}

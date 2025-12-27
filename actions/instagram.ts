import axios from "axios";

import { InstagramPageInfo } from "@/types/instagram";
import { ListOption } from "@/components/formStepper/types";

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
  return [];
}

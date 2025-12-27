import axios from "axios";

import { FacebookPageInfo } from "@/types/facebook";
import { ListOption } from "@/components/formStepper/types";

export async function getPages(
  access_token: string
): Promise<FacebookPageInfo[]> {
  try {
    const response = await axios.get<{ data: FacebookPageInfo[] }>(
      "https://graph.facebook.com/v23.0/me/accounts",
      {
        params: {
          access_token,
          format: "json",
          method: "get",
          transport: "cors",
          fields:
            "about,picture{url,cache_key,height,width},app_id,name,category_list,followers_count",
        },
      }
    );

    return response.data.data as FacebookPageInfo[];
  } catch (e) {
    console.error(e);

    return [];
  }
}

export async function getFacebookAccountInfo(
  accessToken: string
): Promise<string | ListOption[]> {
  const data = await getPages(accessToken);

  if (!data || data.length === 0) return "No tienes páginas disponibles";

  return (
    data.map((page) => ({
      title: page.name,
      value: page.id,
      image: page.picture.data.url,
    })) || []
  );
}

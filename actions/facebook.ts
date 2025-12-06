import axios from "axios";

interface FacebookLongLivedTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number; // segundos (normalmente 60 días)
}

export const getLongLivedFacebookToken = async (
  shortLivedToken: string
): Promise<FacebookLongLivedTokenResponse> => {
  const url = "https://graph.facebook.com/v19.0/oauth/access_token";

  const params = {
    grant_type: "fb_exchange_token",
    client_id: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID ?? "",
    client_secret: process.env.NEXT_PUBLIC_FACEBOOK_SECRET ?? "",
    fb_exchange_token: shortLivedToken,
  };

  try {
    const { data } = await axios.get<FacebookLongLivedTokenResponse>(url, {
      params,
    });

    console.log("Nuevo token de larga duración:", data.access_token);
    console.log("Expira en (segundos):", data.expires_in);

    return data;
  } catch (error: any) {
    console.error(
      "Error obteniendo token de larga duración:",
      error.response?.data || error.message
    );
    throw error;
  }
};

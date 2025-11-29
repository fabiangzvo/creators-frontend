import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { genericOAuth } from "better-auth/plugins";

import { db } from "./db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    nextCookies(),
    genericOAuth({
      config: [
        {
          providerId: "instagram",
          clientId: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID ?? "",
          clientSecret: process.env.NEXT_PUBLIC_INSTAGRAM_SECRET ?? "",
          authorizationUrl:
            "https://api.instagram.com/oauth/authorize?force_reauth=true&client_id=1169223308045331&redirect_uri=https://creators-frontend.vercel.app/api/auth/callback/instagram&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights",
          tokenUrl: "https://api.instagram.com/oauth/access_token",
          scopes: [
            "instagram_business_basic",
            "instagram_business_content_publish",
            "instagram_business_manage_messages",
            "instagram_business_manage_comments",
          ],
        },
      ],
    }),
  ],
  socialProviders: {
    facebook: {
      enabled: true,
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_SECRET ?? "",
      scope: [
        "public_profile",
        "pages_manage_posts",
        "pages_read_engagement",
        "pages_manage_engagement",
      ],
      async getUserInfo(token) {
        console.log("TOKEN FACEBOOK:", JSON.stringify(token));
        return {
          user: {
            id: "aaaa",
            name: "aaaa",
            email: "aaaa",
            image: "aaaa",
            emailVerified: true,
          },
          data: {},
        };
      },
    },
    tiktok: {
      clientSecret: process.env.NEXT_PUBLIC_TIKTOK_SECRET ?? "",
      clientKey: process.env.NEXT_PUBLIC_TIKTOK_CLIENT_ID ?? "",
      enabled: true,
    },
  },
});

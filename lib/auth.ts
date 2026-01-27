import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { instagram } from "better-auth-instagram";

import { db } from "./db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies(), instagram()],
  socialProviders: {
    facebook: {
      enabled: true,
      clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
      clientSecret: process.env.FACEBOOK_SECRET ?? "",
      scope: [
        "public_profile",
        "pages_manage_posts",
        "pages_read_engagement",
        "pages_manage_engagement",
        "pages_show_list",
      ],
      async refreshAccessToken(token) {
        const res = await fetch(
          "https://graph.facebook.com/v18.0/oauth/access_token?" +
            new URLSearchParams({
              grant_type: "fb_exchange_token",
              client_id: process.env.FB_CLIENT_ID!,
              client_secret: process.env.FB_CLIENT_SECRET!,
              fb_exchange_token: token!,
            })
        );

        const data = await res.json();

        return {
          accessToken: data.access_token,
          refreshToken: token ?? null,
          expiresAt: Date.now() + data.expires_in * 1000,
        };
      },
    },
    tiktok: {
      clientSecret: process.env.TIKTOK_SECRET ?? "",
      clientKey: process.env.TIKTOK_CLIENT_ID ?? "",
      enabled: true,
      scope: [
        "user.info.basic",
        "video.upload",
        "user.info.profile",
        "user.info.stats",
      ],
      async refreshAccessToken(token) {
        const res = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            client_key: process.env.TIKTOK_CLIENT_ID!,
            client_secret: process.env.TIKTOK_CLIENT_SECRET!,
            grant_type: "refresh_token",
            refresh_token: token!,
          }),
        });

        const data = await res.json();
        return {
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          expiresAt: Date.now() + data.expires_in * 1000,
        };
      },
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
      enabled: true,
      accessType: "offline",
      prompt: "select_account consent",
      scope: [
        "openid",
        "email",
        "profile",
        "https://www.googleapis.com/auth/youtube.upload",
        "https://www.googleapis.com/auth/youtube.readonly",
        "https://www.googleapis.com/auth/youtube.force-ssl",
        "https://www.googleapis.com/auth/yt-analytics.readonly",
      ],
      async refreshAccessToken(token) {
        const res = await fetch("https://oauth2.googleapis.com/token", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            client_id: process.env.GOOGLE_CLIENT_ID!,
            client_secret: process.env.GOOGLE_CLIENT_SECRET!,
            grant_type: "refresh_token",
            refresh_token: token!,
          }),
        });

        const data = await res.json();

        return {
          accessToken: data.access_token,
          refreshToken: token,
          expiresAt: Date.now() + data.expires_in * 1000,
        };
      },
    },
  },
});

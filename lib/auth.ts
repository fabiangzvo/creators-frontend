import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "../schema";

const sql = neon(process.env.DATABASE_URL as string);
const db = drizzle(sql, { schema });

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
  socialProviders: {
    facebook: {
      enabled: true,
      clientId: "1504971340778448",
      clientSecret: "6bd263fba830a15bb178870fecdb34cc",
      scope: [
        "public_profile",
        "pages_manage_posts",
        "pages_read_engagement",
        "pages_manage_engagement",
      ],
    },
  },
});

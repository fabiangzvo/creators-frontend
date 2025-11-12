import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { Pool } from "pg";

export const auth = betterAuth({
  database: drizzleAdapter(
    new Pool({
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    {
      provider: "pg",
    }
  ),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
  socialProviders: {
    facebook: {
      enabled: true,
      clientId: "1380955649866230",
      clientSecret: "4325b8a0b552f5eadf5f04ab1b6e2ab3",
      scope: [
        "email",
        "public_profile",
        "pages_manage_posts",
        "pages_read_engagement",
        "pages_manage_engagement",
        "instagram_basic",
      ],
    },
  },
});

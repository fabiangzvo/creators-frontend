import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";

import { user } from "./user";
import { status } from "./status";
import { provider } from "./provider";

export const integration = pgTable("integration", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  accountId: text("account_id").notNull(),
  apiKey: text("api_key").notNull(),
  enabled: boolean("enabled").default(true),
  softRemoved: boolean("soft_removed").default(false),
  settings: jsonb("settings"),
  image: text("image"),
  token: text("token").notNull().default(""),
  providerId: uuid("provider_id")
    .notNull()
    .references(() => provider.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  statusId: uuid("status_id")
    .notNull()
    .references(() => status.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

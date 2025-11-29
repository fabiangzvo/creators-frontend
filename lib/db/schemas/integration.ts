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

export const integration = pgTable("integration", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  accountId: text("account_id").notNull(),
  apiKey: text("api_key").notNull(),
  enabled: boolean("enabled").default(true),
  softRemoved: boolean("soft_removed").default(false),
  settings: jsonb("settings"),
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

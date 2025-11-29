import { pgTable, uuid, timestamp, text, boolean } from "drizzle-orm/pg-core";

export const provider = pgTable("provider", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  enabled: boolean("enabled").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

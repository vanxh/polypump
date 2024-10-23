import { relations, sql } from "drizzle-orm";
import { serial, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { createTable } from "./_table";
import { users } from "./user";

export const coins = createTable("coins", {
  id: serial("id").primaryKey(),

  name: varchar("name", { length: 256 }).notNull(),
  symbol: varchar("symbol", { length: 256 }).notNull(),
  description: text("description"),
  imageUrl: varchar("image_url", { length: 256 }).notNull(),
  websiteUrl: varchar("website_url", { length: 256 }),
  telegramUrl: varchar("telegram_url", { length: 256 }),
  twitterUrl: varchar("twitter_url", { length: 256 }),

  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),

  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
});

export const coinRelations = relations(coins, ({ one }) => ({
  user: one(users, {
    fields: [coins.userId],
    references: [users.id],
  }),
}));

export type Coin = typeof coins.$inferSelect;

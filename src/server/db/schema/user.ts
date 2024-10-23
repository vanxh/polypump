import { relations, sql } from "drizzle-orm";
import { timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { createTable } from "./_table";
import { coins } from "./coin";

export const users = createTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  address: varchar("address", { length: 256 }).notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
  coins: many(coins),
}));

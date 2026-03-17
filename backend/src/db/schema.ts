import { pgTable, uuid, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const habits = pgTable("habits", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  is_completed: boolean("is_completed").default(false).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

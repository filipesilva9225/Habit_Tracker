import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const habits = pgTable("habits", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    is_completed: boolean("is_completed").default(false),
    created_at: timestamp("created_at").defaultNow()
});
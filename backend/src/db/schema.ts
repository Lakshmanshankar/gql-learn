import { relations } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("user_name").notNull(),
  email: text("email").unique().notNull(),
});

export const tasks = sqliteTable("tasks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  task_name: text("task_name", { length: 256 }).notNull(),
  status: text("status", {
    enum: ["pending", "not_started", "compeleted"],
  }).notNull(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(), // Foreign key reference
});

export const userRelations = relations(users, ({ many }) => ({
  tasks: many(tasks),
}));

export const taskRelations = relations(tasks, ({ one }) => ({
  user: one(users, {
    fields: [tasks.userId],
    references: [users.id],
  }),
}));

export type TaskInsert = typeof tasks.$inferInsert;
export type TaskSelect = typeof tasks.$inferSelect;
console.log("🧬 schema generated");

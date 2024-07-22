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
    enum: ["pending", "not started", "compeleted"],
  }).notNull(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(), // Foreign key reference
});

//export const userRelations = relations(users, ({ many }) => ({
//  tasks: many(tasks)
//}));
//export const taskRelations = relations(tasks, ({ one }) => ({
//  user: one(users, {
//    fields: [tasks.userId],
//    references: [users.id]
//  })
//}));

export type TaskInsert = typeof tasks.$inferInsert;
export type TaskSelect = typeof tasks.$inferSelect;
// relations

// TYPES
//export type DayOfWeek =
//  | "Monday"
//  | "Tuesday"
//  | "Wednesday"
//  | "Thursday"
//  | "Friday"
//  | "Saturday"
//  | "Sunday";
//
//export const day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
//export const type_files = sqliteTable("type_table", {
//  numeric_value: integer("numeric", { mode: "number" }).primaryKey({
//    autoIncrement: true,
//  }),
//  numeric_boolean: integer("bool_val", { mode: "boolean" }),
//  date_val: integer("date_v", { mode: "timestamp" }),
//  multi_val: text("multi_v", { mode: "json" }).$type<DayOfWeek[]>(),
//  sel_val: text("sel_v", { enum: day }),
//});
//
//export type FileInsertType = typeof type_files.$inferInsert;
//export type FileSelectType = typeof type_files.$inferSelect;
//console.log("🧬 schema generated");

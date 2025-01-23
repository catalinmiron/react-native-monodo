// nothing

import { sql } from "drizzle-orm";
import * as t from "drizzle-orm/sqlite-core";

export const todos = t.sqliteTable("todos", {
  id: t.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  content: t.text().notNull(),
  // this should be formated as YYYY-MM-DD
  date: t.integer({ mode: "timestamp" }).notNull(),
  description: t.text().default(""),
  created_at: t.text().default(sql`(CURRENT_TIMESTAMP)`),
  done: t.integer().default(0),
});

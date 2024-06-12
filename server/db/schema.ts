
import { serial, pgTable, varchar, timestamp, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  password: varchar("password", { length: 256 }).notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const notes = pgTable("notes", {
    id: serial('id').primaryKey(),
    title: varchar("title", { length: 256 }).notNull(),
    content: varchar("content", { length: 256 }).notNull(),
    userId: integer("userId").notNull().references(() => users.id),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const dummyUsers = pgTable("dummyUsers", {
    id: serial('id').primaryKey(),
    email: varchar("email", { length: 256 }).notNull(),
    password: varchar("name", { length: 256 }).notNull(),
    token: varchar("token", { length: 256 }).notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
});
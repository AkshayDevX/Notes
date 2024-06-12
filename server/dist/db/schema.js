"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dummyUsers = exports.notes = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    email: (0, pg_core_1.varchar)("email", { length: 256 }).notNull().unique(),
    password: (0, pg_core_1.varchar)("password", { length: 256 }).notNull(),
    createdAt: (0, pg_core_1.timestamp)("createdAt").notNull().defaultNow(),
});
exports.notes = (0, pg_core_1.pgTable)("notes", {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    title: (0, pg_core_1.varchar)("title", { length: 256 }).notNull(),
    content: (0, pg_core_1.varchar)("content", { length: 256 }).notNull(),
    userId: (0, pg_core_1.integer)("userId").notNull().references(() => exports.users.id),
    createdAt: (0, pg_core_1.timestamp)("createdAt").notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updatedAt").notNull().defaultNow(),
});
exports.dummyUsers = (0, pg_core_1.pgTable)("dummyUsers", {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    email: (0, pg_core_1.varchar)("email", { length: 256 }).notNull(),
    password: (0, pg_core_1.varchar)("name", { length: 256 }).notNull(),
    token: (0, pg_core_1.varchar)("token", { length: 256 }).notNull(),
    createdAt: (0, pg_core_1.timestamp)("createdAt").notNull().defaultNow(),
});
//# sourceMappingURL=schema.js.map
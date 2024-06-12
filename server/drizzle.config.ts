import * as dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";
dotenv.config();

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DRIZZLE_DATABASE_URL,
  },
  verbose: true,
  strict: true,
});



import type { Config } from 'drizzle-kit'

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DRIZZLE_DB_URL!,
  },
} satisfies Config;
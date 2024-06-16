import { type Config } from "drizzle-kit";

import { env } from "@/env";

export default {
  schema: "./src/db/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["candle-shop_*"],
} satisfies Config;

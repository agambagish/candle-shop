import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const storePlanEnum = pgEnum("store_plan", ["free", "pro"]);

export const stores = pgTable("stores", {
  id: varchar("id", { length: 42 })
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  clerkId: varchar("clerk_id", { length: 36 }).unique().notNull(),
  subdomain: varchar("subdomain", { length: 12 }).unique().notNull(),
  name: varchar("name", { length: 32 }).notNull(),
  plan: storePlanEnum("plan").notNull().default("free"),
  planEndsAt: timestamp("plan_ends_at"),
  cancelPlanAtEnd: boolean("cancel_plan_at_end").default(false),
  stripeConnectAccountId: varchar("stripe_connect_account_id").unique(),
  productLimit: integer("product_limit").notNull().default(10),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type Store = typeof stores.$inferSelect;
export type NewStore = typeof stores.$inferInsert;

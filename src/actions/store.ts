"use server";

import { db } from "@/db";
import { stores } from "@/db/schema";
import { env } from "@/env";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export const createStore = async (values: {
  name: string;
  subdomain: string;
}): Promise<{ message: string; storeId?: string }> => {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthorized.");
    }

    const storeWithSameSubdomain = await db.query.stores.findFirst({
      where: eq(stores.subdomain, values.subdomain),
    });

    if (storeWithSameSubdomain) {
      throw new Error(
        `"${values.subdomain}.${env.NEXT_PUBLIC_DOMAIN}" is already taken.`
      );
    }

    const store = await db
      .insert(stores)
      .values({ ...values, clerkId: userId })
      .returning();

    return {
      message: `Store "${store[0]?.name}" created successfully.`,
      storeId: store[0]?.id,
    };
  } catch (error) {
    throw new Error("An error occurred. Please try again.");
  }
};

import { db } from "@/db";
import { stores } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

const Layout = async ({ children }: React.PropsWithChildren) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await db.query.stores.findFirst({
    where: eq(stores.clerkId, userId),
  });

  if (store) {
    redirect(`/dashboard/${store.id}`);
  }

  return <>{children}</>;
};

export default Layout;

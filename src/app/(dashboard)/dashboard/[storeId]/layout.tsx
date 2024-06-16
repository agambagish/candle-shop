import { db } from "@/db";
import { stores } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

type Props = {
  params: {
    storeId: string;
  };
} & React.PropsWithChildren;

const Layout = async ({ params, children }: Props) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await db.query.stores.findFirst({
    where: and(eq(stores.id, params.storeId), eq(stores.clerkId, userId)),
  });

  if (!store) {
    redirect("/create-your-store");
  }

  return <>{children}</>;
};

export default Layout;

import { MainNav } from "@/components/global/main-nav";
import { buttonVariants } from "@/components/ui/button";
import { db } from "@/db";
import { stores } from "@/db/schema";
import { cn } from "@/lib/utils";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const Layout = async ({ children }: React.PropsWithChildren) => {
  const { userId } = auth();

  const store = await db.query.stores.findFirst({
    where: eq(stores.clerkId, userId ?? ""),
    columns: { id: true },
  });

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav
            routes={[
              { title: "Pricing", href: "/pricing" },
              { title: "Solutions", href: "/solutions", disabled: true },
            ]}
          />
          <ClerkLoaded>
            <SignedOut>
              <nav>
                <Link
                  href="/sign-in"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "sm" }),
                    "px-4"
                  )}
                >
                  Sign In
                </Link>
              </nav>
            </SignedOut>
            <SignedIn>
              <nav className="flex space-x-4">
                <UserButton afterSignOutUrl="/" />
                <Link
                  href={store ? `/dashboard/${store.id}` : "/create-your-store"}
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "sm" }),
                    "px-4"
                  )}
                >
                  {store ? "Dashboard" : "Setup Store"}
                </Link>
              </nav>
            </SignedIn>
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2
              aria-hidden
              className="animate-spin text-muted-foreground"
            />
          </ClerkLoading>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      Footer
    </div>
  );
};

export default Layout;

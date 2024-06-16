import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { env } from "@/env";
import { cn } from "@/lib/utils";
import { ModalProvider } from "@/providers/modal-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import { Jost } from "next/font/google";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: "Candle Shop",
    template: `%s | Candle Shop`,
  },
  description:
    "Open source multi vendor E-commerce build with Next.js, Drizzle ORM, Stripe.",
  keywords: [
    "nextjs",
    "react",
    "react server components",
    "drizzle orm",
    "postgresql",
    "stripe",
    "candleshop",
  ],
  authors: [
    {
      name: "Akash",
      url: "https://twitter.com/MacherJholBhaat",
    },
  ],
  creator: "Akash",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://candleshop.vercel.app",
    title: "Candle Shop",
    description:
      "Open source multi vendor E-commerce build with Next.js, Drizzle ORM, Stripe.",
    siteName: "Candle Shop",
  },
  twitter: {
    card: "summary_large_image",
    title: "Candle Shop",
    description:
      "Open source multi vendor E-commerce build with Next.js, Drizzle ORM, Stripe.",
    images: ["https://candleshop.vercel.app/opengraph-image.png"],
    creator: "@MacherJholBhaat",
  },
  icons: { icon: "/icon.png" },
};

const font = Jost({ subsets: ["latin"] });

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background antialiased",
            font.className
          )}
        >
          <ModalProvider />
          {children}
          <Toaster theme="light" toastOptions={{ className: font.className }} />
        </body>
      </html>
    </ClerkProvider>
  );
};

export default Layout;

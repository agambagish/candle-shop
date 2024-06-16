"use client";

import { cn } from "@/lib/utils";
import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useState } from "react";

type Props = {
  routes: {
    title: string;
    href: string;
    disabled?: boolean;
  }[];
} & React.PropsWithChildren;

export const MainNav = ({ routes, children }: Props) => {
  const segment = useSelectedLayoutSegment();
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <svg
          aria-hidden
          stroke="currentColor"
          fill="none"
          strokeWidth={2}
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          height="22px"
          width="22px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9 21h6v-9a1 1 0 0 0 -1 -1h-4a1 1 0 0 0 -1 1v9z" />
          <path d="M12 3l1.465 1.638a2 2 0 1 1 -3.015 .099l1.55 -1.737z" />
        </svg>
        <span className="hidden font-bold sm:inline-block">Candle Shop</span>
      </Link>
      <nav className="hidden gap-6 md:flex">
        {routes.map((route, index) => (
          <Link
            key={index}
            href={route.disabled ? "#" : route.href}
            className={cn(
              "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
              route.href.startsWith(`/${segment}`)
                ? "text-foreground"
                : "text-foreground/60",
              route.disabled && "cursor-not-allowed opacity-80"
            )}
          >
            {route.title}
          </Link>
        ))}
      </nav>
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <XIcon aria-hidden /> : <MenuIcon aria-hidden />}
        <span className="font-bold">Menu</span>
      </button>
      {/* {showMobileMenu && (
        <MobileNav items={items}>{children}</MobileNav>
      )} */}
    </div>
  );
};

"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { cn } from "@/lib/utils";

export default function BottomBar() {
  const { status } = useSession();

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-between border-t border-border bg-background p-4 md:hidden">
      <BottomBarLink href="/">
        <Image src="/home-icon.png" alt="Home" width={24} height={24} />
      </BottomBarLink>
      <BottomBarLink href="/explore">
        <Image src="/explore-icon.png" alt="Explore" width={24} height={24} />
      </BottomBarLink>
      <BottomBarLink href="/new-coins">
        <Image
          src="/new-coins-icon.png"
          alt="New Coins"
          width={24}
          height={24}
        />
      </BottomBarLink>
      <BottomBarLink href="/my-coins">
        <Image src="/wallet-icon.png" alt="Wallet" width={24} height={24} />
      </BottomBarLink>
      <BottomBarLink href="/create-coin" disabled={status !== "authenticated"}>
        <Image
          src="/create-coin-icon.png"
          alt="Create"
          width={24}
          height={24}
        />
      </BottomBarLink>
    </div>
  );
}

const BottomBarLink = ({
  href,
  children,
  disabled,
}: {
  href: string;
  children: React.ReactNode;
  disabled?: boolean;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-4 rounded-2xl px-4 py-3 text-lg font-medium transition-colors duration-200 ease-in-out hover:bg-sky-400/10",
        isActive && "text-sky-400",
        isActive && "border border-sky-400 bg-sky-400/10",
        disabled && "cursor-not-allowed opacity-50",
      )}
      onClick={(e) => {
        if (disabled) e.preventDefault();
      }}
    >
      {children}
    </Link>
  );
};

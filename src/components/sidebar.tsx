"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import ConnectButton from "@/components/connect-button";

export default function Sidebar() {
  return (
    <div className="hidden h-screen w-80 flex-col border-r border-border bg-background p-4 md:flex lg:p-6">
      <Link href="/" className="mx-auto text-2xl font-bold text-accent">
        PolyPump
      </Link>

      <div className="mt-8 flex flex-col gap-4">
        <SidebarLink href="/">
          <Image src="/home-icon.png" alt="Home" width={24} height={24} />
          Home
        </SidebarLink>
        <SidebarLink href="/explore">
          <Image src="/explore-icon.png" alt="Explore" width={24} height={24} />
          Explore
        </SidebarLink>
        <SidebarLink href="/new-coins">
          <Image
            src="/new-coins-icon.png"
            alt="New Coins"
            width={24}
            height={24}
          />
          New Coins
        </SidebarLink>
        <SidebarLink href="/my-coins">
          <Image src="/wallet-icon.png" alt="Wallet" width={24} height={24} />
          My Coins
        </SidebarLink>
        <SidebarLink href="/create-coin">
          <Image
            src="/create-coin-icon.png"
            alt="Create"
            width={24}
            height={24}
          />
          Create Coin
        </SidebarLink>
      </div>

      <div className="my-auto" />
      <ConnectButton />
    </div>
  );
}

const SidebarLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
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
      )}
    >
      {children}
    </Link>
  );
};

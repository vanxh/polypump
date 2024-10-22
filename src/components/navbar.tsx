import Link from "next/link";

import ConnectButton from "@/components/connect-button";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between border-b border-border p-4 md:hidden">
      <Link href="/" className="text-2xl font-bold text-accent">
        PolyPump
      </Link>

      <ConnectButton />
    </div>
  );
}

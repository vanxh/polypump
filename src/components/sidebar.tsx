import Link from "next/link";

import ConnectButton from "@/components/connect-button";

export default function Sidebar() {
  return (
    <div className="bg-background border-border hidden h-screen w-64 flex-col border-r p-4 md:flex lg:p-6">
      <Link href="/" className="text-accent mx-auto text-2xl font-bold">
        PolyPump
      </Link>

      <div className="my-auto" />
      <ConnectButton />
    </div>
  );
}

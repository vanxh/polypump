import { Search } from "lucide-react";

import { api, HydrateClient } from "@/trpc/server";
import { Input } from "@/components/ui/input";
import CoinList from "@/components/coin-list";

export default async function Home() {
  const { coins } = await api.coin.getLatest({});

  return (
    <HydrateClient>
      <main className="flex h-screen w-full flex-col items-center gap-y-6 overflow-y-auto px-4 py-6">
        <Input
          variant="primary"
          placeholder="Search for a coin"
          className="w-[90vw] md:w-[60vw]"
          icon={Search}
        />

        <h1 className="mr-auto text-2xl font-bold">Trending Coins</h1>

        <CoinList coins={coins} />
      </main>
    </HydrateClient>
  );
}

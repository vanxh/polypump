import { Search } from "lucide-react";

import { HydrateClient } from "@/trpc/server";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Page() {
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

        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          {Array.from({ length: 10 }).map((_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <Skeleton key={index} className="h-40 w-full" />
          ))}
        </div>
      </main>
    </HydrateClient>
  );
}

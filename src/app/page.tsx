import { Search } from "lucide-react";

import { HydrateClient } from "@/trpc/server";
import { Input } from "@/components/ui/input";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex w-full flex-col items-center px-4 py-6">
        <Input
          variant="primary"
          placeholder="Search for a coin"
          className="w-[90vw] md:w-[60vw]"
          icon={Search}
        />
      </main>
    </HydrateClient>
  );
}

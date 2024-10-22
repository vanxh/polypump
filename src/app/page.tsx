import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main>Duolingo</main>
    </HydrateClient>
  );
}

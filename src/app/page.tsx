import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main>YO</main>
    </HydrateClient>
  );
}

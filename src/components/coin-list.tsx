import type { Coin } from "@/server/db/schema";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";

export default function CoinList({ coins }: { coins?: Coin[] }) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {coins?.map((coin) => (
        <div
          key={coin.id}
          className="flex h-40 w-full gap-x-4 rounded-2xl border border-border p-4"
        >
          <Image src={coin.imageUrl} alt={coin.name} width={126} height={126} />

          <div className="flex flex-col gap-y-2">
            <h3 className="text-lg font-bold">{coin.name}</h3>
            <p className="text-sm text-muted-foreground">{coin.symbol}</p>
          </div>
        </div>
      ))}

      {!coins &&
        Array.from({ length: 24 }).map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <Skeleton key={index} className="h-40 w-full" />
        ))}

      {!coins?.length && (
        <p className="text-sm text-muted-foreground">No coins found</p>
      )}
    </div>
  );
}

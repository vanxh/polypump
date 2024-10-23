import { z } from "zod";

import { coins } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const coinRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        symbol: z.string(),
        description: z.string(),
        imageUrl: z.string(),
        websiteUrl: z.string(),
        telegramUrl: z.string(),
        twitterUrl: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const coin = await ctx.db.insert(coins).values({
        name: input.name,
        symbol: input.symbol,
        description: input.description,
        imageUrl: input.imageUrl,
        websiteUrl: input.websiteUrl,
        telegramUrl: input.telegramUrl,
        twitterUrl: input.twitterUrl,
        userId: ctx.session?.user.name,
      });

      return coin;
    }),
});

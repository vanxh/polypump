import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { coins, users } from "@/server/db/schema";
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
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.address, ctx.session?.user.name),
      });

      if (!user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const coin = await ctx.db.insert(coins).values({
        name: input.name,
        symbol: input.symbol,
        description: input.description,
        imageUrl: input.imageUrl,
        websiteUrl: input.websiteUrl,
        telegramUrl: input.telegramUrl,
        twitterUrl: input.twitterUrl,
        userId: user?.id,
      });

      return coin;
    }),
});

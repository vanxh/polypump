import { TRPCError } from "@trpc/server";
import { desc, eq, lt } from "drizzle-orm";
import { z } from "zod";

import { coins, users } from "@/server/db/schema";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

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

  getLatest: publicProcedure
    .input(
      z.object({
        limit: z.number().int().min(1).max(100).default(50),
        cursor: z.number().int().nullable().default(null),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { limit, cursor } = input;

      const res = await ctx.db.query.coins.findMany({
        orderBy: [desc(coins.createdAt)],
        limit: limit + 1,
        ...(cursor ? { where: (fields) => lt(fields.id, cursor) } : {}),
      });

      let nextCursor: number | null = null;
      if (res.length > limit) {
        const nextItem = res.pop();
        nextCursor = nextItem?.id ?? null;
      }

      return {
        coins: res,
        nextCursor,
      };
    }),

  getMyCoins: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.query.users.findFirst({
      where: eq(users.address, ctx.session?.user.name),
    });

    if (!user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const res = await ctx.db.query.coins.findMany({
      where: eq(coins.userId, user.id),
    });

    return res;
  }),
});

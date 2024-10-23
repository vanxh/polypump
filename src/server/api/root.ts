import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { coinRouter } from "@/server/api/routers/coin";

export const appRouter = createTRPCRouter({
  coin: coinRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);

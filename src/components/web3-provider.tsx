"use client";

import "@rainbow-me/rainbowkit/styles.css";

import {
  type GetSiweMessageOptions,
  RainbowKitSiweNextAuthProvider,
} from "@rainbow-me/rainbowkit-siwe-next-auth";
import type { Session } from "next-auth";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { polygon, polygonAmoy } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { env } from "@/env";
import SessionProvider from "@/components/session-provider";

const config = getDefaultConfig({
  appName: "PolyPump",
  projectId: env.NEXT_PUBLIC_WC_PROJECT_ID,
  chains: [polygon, polygonAmoy],
  ssr: true,
});

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: "Sign in to PolyPump",
});

const queryClient = new QueryClient();

export default function Web3Provider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <WagmiProvider config={config}>
      <SessionProvider refetchInterval={0} session={session}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitSiweNextAuthProvider
            getSiweMessageOptions={getSiweMessageOptions}
          >
            <RainbowKitProvider>{children}</RainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
        </QueryClientProvider>
      </SessionProvider>
    </WagmiProvider>
  );
}

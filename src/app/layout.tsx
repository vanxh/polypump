import "@/styles/globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";
import { getServerSession } from "next-auth";

import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import Web3Provider from "@/components/web3-provider";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import BottomBar from "@/components/bottombar";

export const metadata: Metadata = {
  title: "Polypump",
  description: "Polypump",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const featherBold = localFont({
  src: "./feather-bold.woff2",
  variable: "--font-feather-bold",
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${featherBold.variable} font-feather`}
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <Web3Provider session={session}>
            <TRPCReactProvider>
              <div className="relative flex h-screen flex-col overflow-hidden pb-20 md:flex-row md:pb-0">
                <Navbar />
                <Sidebar />
                {children}
                <BottomBar />
              </div>
            </TRPCReactProvider>
          </Web3Provider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

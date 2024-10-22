import "@/styles/globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";
import type { Session } from "next-auth";

import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/components/theme-provider";
import Web3Provider from "@/components/web3-provider";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";

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

export default function RootLayout({
  children,
  session,
}: Readonly<{ children: React.ReactNode; session: Session | null }>) {
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
              <div className="relative flex h-screen flex-col overflow-hidden md:flex-row">
                <Navbar />
                <Sidebar />
                {children}
              </div>
            </TRPCReactProvider>
          </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import "@/styles/globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";

import { TRPCReactProvider } from "@/trpc/react";

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
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${featherBold.variable} font-feather`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}

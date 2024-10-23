import { getServerSession, type AuthOptions, type Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";
import { eq } from "drizzle-orm";

import { db } from "@/server/db";
import { users } from "@/server/db/schema";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        message: {
          label: "Message",
          placeholder: "0x0",
          type: "text",
        },
        signature: {
          label: "Signature",
          placeholder: "0x0",
          type: "text",
        },
      },
      async authorize(credentials, req) {
        try {
          const siwe = new SiweMessage(credentials?.message ?? "");

          const nextAuthUrl =
            process.env.NEXTAUTH_URL ??
            (process.env.VERCEL_URL
              ? `https://${process.env.VERCEL_URL}`
              : null);
          if (!nextAuthUrl) {
            return null;
          }

          const nextAuthHost = new URL(nextAuthUrl).host;
          if (siwe.domain !== nextAuthHost) {
            return null;
          }

          if (
            siwe.nonce !==
            (await getCsrfToken({ req: { headers: req.headers } }))
          ) {
            return null;
          }

          await siwe.verify({ signature: credentials?.signature ?? "" });

          const user = await db.query.users.findFirst({
            where: eq(users.address, siwe.address),
          });

          if (!user) {
            await db.insert(users).values({ address: siwe.address });
          }

          return {
            id: siwe.address,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },

  debug: process.env.NODE_ENV === "development",

  secret: process.env.NEXAUTH_SECRET,

  callbacks: {
    async session({
      session,
      token,
    }: {
      session: Session & { address?: string };
      token: JWT;
    }) {
      session.address = token.sub;
      session.user = {
        name: token.sub,
      };
      return session;
    },
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);

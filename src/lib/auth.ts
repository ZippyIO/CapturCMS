import { PrismaAdapter } from '@auth/prisma-adapter';

import { type NextAuthOptions } from 'next-auth';
import { type Adapter } from 'next-auth/adapters';
import GitHubProvider from 'next-auth/providers/github';

import db from '~/lib/db';

export const nextAuthOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user }) {
      const existingUser = await db.user.findUnique({
        where: { id: user.id },
      });

      if (existingUser) {
        return true;
      } else {
        return false;
      }
    },
    async session({ token, session }) {
      if (token?.sub) {
        session.user.id = token.sub;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
  },
};

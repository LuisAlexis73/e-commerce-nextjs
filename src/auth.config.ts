import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import prisma from './lib/prisma';
import bcryptjs from 'bcryptjs';
import { AdapterUser } from 'next-auth/adapters';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/signin',
    newUser: 'auth/new-account',
  },
  callbacks: {
    authorized({ auth, request: { } }) {
      console.log({ auth })
      // const isLoggedIn = !!auth?.user;
      // const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      // if (isOnDashboard) {
      //   if (isLoggedIn) return true;
      //   return false;
      // } else if (isLoggedIn) {
      //   return Response.redirect(new URL('/dashboard', nextUrl))
      // }

      return true;
    },

    jwt({ token, user }) {

      if (user) {
        token.data = user
      }

      return token;
    },

    session({ session, token }) {

      session.user = token.data as AdapterUser & { id: string; name: string; email: string; role: string; image?: string };

      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          throw new Error('Invalid credentials')
        }

        const { email, password } = parsedCredentials.data;

        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        })
        if (!user) {
          throw new Error('Invalid credentials')
        }

        if (!bcryptjs.compareSync(password, user.password)) {
          return null
        }

        return user;
      },
    }),
  ]
};

export const { auth, signIn, signOut, handlers } = NextAuth(authConfig);
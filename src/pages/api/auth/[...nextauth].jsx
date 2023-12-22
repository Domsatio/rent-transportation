// import type { NextApiRequest, NextApiResponse } from "next"
import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import db from '@/libs/prisma';
import bcrypt from 'bcrypt';
import { existingUser } from '@/controllers/userController';

export const authOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        name: { label: 'name', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials, req) {
        const user = await existingUser(credentials.email);
        if (user) {
          const match = await bcrypt.compare(credentials.password, user.password);
          if (match) {
            return user
          } else {
            return null
          }
        }

      },
    }),
  ],
  pages: {
    signIn: '/sign-in'
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({token, user}) {
      return {...token, ...user}
    },
    async session({session, token}) {
      session.user.role = token.role;
      return session
    },
  },
}

export default NextAuth(authOptions);


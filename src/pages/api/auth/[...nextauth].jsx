// import type { NextApiRequest, NextApiResponse } from "next"
import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import db from '@/libs/prisma';
import bcrypt from 'bcrypt';
import { existingUser } from '@/controllers/userController';

export const authOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: 'user',
        }
      },
      style: { logo: "/google.svg", bg: "#fff", text: "#000" },
    },
    ),
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
  // pages: {
  //   signIn: async (req) => {
  //     // Check if the path starts with /admin
  //     if (req.url.startsWith('/admin')) {
  //       return '/admin/sign-in';
  //     }
  //     // Default signIn page
  //     return '/sign-in';
  //   },
  // },
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


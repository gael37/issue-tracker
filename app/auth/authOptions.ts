import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/prisma/client';
import { NextAuthOptions } from 'next-auth';
import bcrypt from 'bcrypt'


const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user) return null

        const passwordsMatch = await bcrypt.compare(credentials.password, user.hashedPassword!)

        return passwordsMatch ? user : null
      }
    }),
    GoogleProvider({
      name: 'google',
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  theme: {
    colorScheme: "light", // "auto" | "dark" | "light"
    brandColor: "#265d2d", // Hex color code
    logo: 'https://wallpapercave.com/wp/wp4291093.jpg', // Absolute URL to image
    buttonText: "#265d2d" // Hex color code
  },
  pages: {
    signIn: '/login',
  }
};

export default authOptions;
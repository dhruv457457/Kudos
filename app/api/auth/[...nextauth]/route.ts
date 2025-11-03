import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/lib/db'; // Your Prisma client
import type { Adapter } from 'next-auth/adapters';

// Define the authentication options
export const authOptions = {
  // 1. Use the Prisma Adapter to store user data in your MongoDB
  adapter: PrismaAdapter(db) as Adapter,

  // 2. Configure one or more sign-in providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // You can add more providers here (e.g., GitHub, Email)
  ],

  // 3. Define the session strategy
  session: {
    strategy: 'jwt', // Use JSON Web Tokens for session management
  },

  // 4. Callbacks are custom functions to control auth behavior
  callbacks: {
    // This callback is triggered when a JWT is created or updated
    async jwt({ token, user }: { token: any; user: any }) {
      // If this is the user's first login (the 'user' object is passed),
      // add their database ID to the token.
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    // This callback is triggered when a session is checked
    async session({ session, token }: { session: any; token: any }) {
      // Add the user's database ID (from the token) to the session object.
      // This makes it available in your components and Server Actions.
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },

  // 5. A secret key for signing tokens
  secret: process.env.NEXTAUTH_SECRET as string,
};

// Create the NextAuth handler
const handler = NextAuth(authOptions);

// Export the handler for both GET and POST requests
export { handler as GET, handler as POST };
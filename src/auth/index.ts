import NextAuth, {  NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import client from "@/db"

export const BASE_PATH = "/api/auth";

export const authOptions: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    
  ],
  basePath: BASE_PATH,
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      try {
        if (!user.email) {
          throw new Error("User email is null or undefined");
        }
        
        // Check if the user already exists in the database
        const existingUser = await client.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          // If the user doesn't exist, create a new user
          await client.user.create({
            data: {
              email: user.email,
              name: user.name ?? "Anonymous",
      
            },
          });
        }

        return true;
      } catch (error) {
        console.error("Error signing in user:", error);
        return false;
      }
    },
    async session({ session, user }) {
      try {

        if (!session.user || !session.user.email) {
          console.error("Session user email is missing");
          return session;
        }

        // Fetch existing user by email
        const existingUser = await client.user.findUnique({
          where: { email: session.user.email },
        });

        if (existingUser) {
          console.log('Existing user found:', existingUser);
          session.user.id = existingUser.id.toString(); // Add the id to the session object
        } else {
          console.warn('No existing user found for email:', session.user.email);
        }

        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }
    },
    
  }
};


export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);

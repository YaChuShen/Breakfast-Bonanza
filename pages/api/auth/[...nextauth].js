import NextAuth from "next-auth";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "../../../firebase.config";
import * as firestoreFunctions from "firebase/firestore";
import admin from "../../../functions/admin";

const authHandler = NextAuth({
  session: {
    // This is the default. The session is saved in a cookie and never persisted anywhere.
    strategy: "jwt",
  },
  pages: {
    // signIn: "/auth/signin",
  },
  // Enable debug messages in the console if you are having problems
  debug: true,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          // placeholder: "your cool email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const db = admin.firestore();

        const userRef = await db
          .collection("users")
          .where("email", "==", credentials?.email)
          .get();

        const user = userRef.docs[0].data();

        if (user) {
          return {
            ...user,
            token: credentials?.csrfToken,
            profileId: userRef.docs[0]?.id,
          };
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  adapter: FirestoreAdapter({ db: db, ...firestoreFunctions }),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      return { ...token, ...user };
    },
    session: async ({ session, token }) => {
      session.user = token;
      return session;
    },
  },
});

export default async function handler(...params) {
  await authHandler(...params);
}

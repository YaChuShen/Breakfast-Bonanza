import NextAuth from "next-auth";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "../../../firebase.config";
import * as firestoreFunctions from "firebase/firestore";
import admin from "../../../functions/admin";

const authHandler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  debug: true,
  providers: [
    CredentialsProvider({
      id: "credentials",
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
        console.log(credentials);

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
  jwt: {
    maxAge: 60 * 60 * 24 * 30, // 1 day
  },
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

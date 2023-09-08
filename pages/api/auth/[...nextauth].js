import NextAuth from "next-auth";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "../../../firebase.config";
import * as firestoreFunctions from "firebase/firestore";
import admin from "../../../functions/admin";
import bcrypt from "bcrypt";

const authHandler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "your cool email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("credentials", credentials);

        const db = admin.firestore();

        const userRef = await db
          .collection("users")
          .where("email", "==", credentials?.email)
          .get();

        if (userRef.size) {
          const checkPassword = await bcrypt.compare(
            credentials?.password,
            userRef.docs[0].data()?.password
          );

          if (checkPassword) {
            return { name: "annnn" };
          }
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
  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }) {
  //     console.log("fire signin Callback");
  //     return true;
  //   },
  // },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      // Persist the BE access_token to the token right after signin
      if (user) {
        // token.roles = user.roles;
        // token.usercode = user.usercode;
        token.email = user.email;
        token.name = user.name;

        if (user.token) {
          token.accessToken = user.token;
        }
      }

      return token;
    },
    session: ({ session, token, user }) => {
      // add cookies jwt token from FE (callback jwt) to client side
      if (token) {
        // session.user.roles = token.roles;
        session.user.email = token.email;
        session.user.name = token.name;
        // session.user.usercode = token.usercode;
        session.user.accessToken = token.accessToken;
      }

      return session;
    },
  },
  // ...
});

export default async function handler(...params) {
  await authHandler(...params);
}

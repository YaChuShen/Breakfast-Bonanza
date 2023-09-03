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
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "your cool username",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("credentials", credentials);

        const db = admin.firestore();

        const userRef = await db
          .collection("users")
          .where("email", "==", credentials?.username)
          .where("password", "==", credentials?.password)
          .get();

        if (userRef.size) {
          console.log(userRef.docs[0].data());
          return { name: "annnn" };
        }
        // return null;

        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        // const res = await fetch("/your/endpoint", {
        //   method: "POST",
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" },
        // });
        // const user = await res.json();

        // If no error and we have user data, return it
        // if (res.ok && user) {
        //   return user;
        // }
        // Return null if user data could not be retrieved
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

import NextAuth from "next-auth";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import GoogleProvider from "next-auth/providers/google";
import { db } from "../../../firebase.config";
import * as firestoreFunctions from "firebase/firestore";

export default NextAuth({
  providers: [
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
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("fire signin Callback");
      return true;
    },
  },
  // ...
});

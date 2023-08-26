import NextAuth from "next-auth";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { db } from "../../../firebase.config";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ]
  adapter: FirestoreAdapter(db),
  // ...
});

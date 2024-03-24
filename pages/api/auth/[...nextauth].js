import NextAuth from 'next-auth';
import { FirestoreAdapter } from '@auth/firebase-adapter';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '../../../firebase.config';
import * as firestoreFunctions from 'firebase/firestore';
import admin from '../../../functions/admin';
import bcrypt from 'bcrypt';

export const NextAuthOptions = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
  debug: true,
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          // placeholder: "your cool email",
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req, res) {
        const db = admin.firestore();
        const { password, email } = credentials;

        const userRef = await db
          .collection('users')
          .where('email', '==', email)
          .get();

        if (!userRef.docs.length) return { error: 'no user' };

        const user = userRef.docs[0].data();
        const isValid = await bcrypt.compare(password, user?.password);
        if (!isValid) {
          return { error: 'password error' };
        }

        console.log('Successful login');
        delete user.password;

        return {
          ...user,
          profileId: userRef.docs[0]?.id,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  jwt: {
    maxAge: 60 * 60 * 24 * 1, // 1 day
  },
  adapter: FirestoreAdapter({ db: db, ...firestoreFunctions }),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      return { ...token, ...user };
    },
    session: async ({ session, token }) => {
      return { ...session, ...token };
    },
    async signIn({ user }) {
      if (user?.error === 'password error') {
        throw new Error(
          'The password you entered is incorrect. Please try again.'
        );
      }
      if (user?.error === 'no user') {
        throw new Error(
          'No account found with that email. Please check your email or register.'
        );
      }
      return true;
    },
  },
});

export default async function handler(...params) {
  await NextAuthOptions(...params);
}

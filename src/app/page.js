import admin from 'functions/admin';
import HomePage from 'Components/HomePage';
import NextAuthOptions from 'pages/api/auth/[...nextauth]';
const { getServerSession } = require('next-auth');

const Page = async () => {
  const userSession = await getServerSession(NextAuthOptions);

  const db = admin.firestore();
  let data;
  const profieQuery = await db
    .collection('users')
    .where('email', '==', userSession?.user?.email ?? '')
    .get();
  if (profieQuery.size) {
    data = profieQuery.docs[0].data();
  }

  return <HomePage dbData={JSON.parse(JSON.stringify(data ?? {}) ?? {})} />;
};

export default Page;

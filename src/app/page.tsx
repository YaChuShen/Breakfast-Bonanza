import admin from 'functions/admin';
import HomePage from 'Components/HomePage';
import authOptions from 'pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { Session } from 'next-auth';
import { AuthOptions } from 'next-auth';

interface ScoreData {
  score: number;
  time: number;
}

interface UserData {
  email: string;
  password: string;
  name: string;
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
  isLevel2: boolean;
  isTour: boolean;
  score: ScoreData[];
  lastPlayTime: {
    _seconds: number;
    _nanoseconds: number;
  };
  avatar: string;
}

const Page = async () => {
  const userSession: Session | null = await getServerSession(authOptions as unknown as AuthOptions);

  const db = admin.firestore();
  let data: UserData | undefined;
  let profileId: string | undefined;

  const profieQuery = await db
    .collection('users')
    .where('email', '==', userSession?.user?.email ?? '')
    .get();

  if (profieQuery.size) {
    data = profieQuery.docs[0].data() as UserData;
    console.log(data);
    profileId = profieQuery.docs[0].id;
  }

  return (
    <HomePage
      dbData={JSON.parse(JSON.stringify(data ?? {}) ?? {})}
      profileId={profileId ?? ''}
    />
  );
};

export default Page;

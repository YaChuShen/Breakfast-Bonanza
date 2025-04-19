import admin from 'functions/admin';
import Profile from 'Components/Profile';
import { Suspense } from 'react';
import Loading from 'Components/Loading';

interface PageProps {
  params: {
    id: string;
  };
}

interface Score {
  score: number;
  time: string;
}

interface ProfileData {
  isLevel2: boolean;
  name: string;
  email: string;
  avatar?: string;
  image?: string;
  score?: Score[];
}

const Page = async ({ params }: PageProps) => {
  const db = admin.firestore();

  const profileSnaps = await db.collection('users').doc(params.id).get();
  const safeData: ProfileData = profileSnaps.exists
    ? JSON.parse(JSON.stringify(profileSnaps.data()))
    : {
        isLevel2: false,
        name: '',
        email: '',
      };

  return (
    <Suspense fallback={<Loading />}>
      <Profile data={safeData} profileId={params.id} />
    </Suspense>
  );
};

export default Page;

export async function generateStaticParams(): Promise<{ params: { id: string } }[]> {
  const db = admin.firestore();
  const profileSnaps = await db.collection('users').get();

  const paths = profileSnaps.docs.map((doc) => ({
    params: { id: doc.id },
  }));

  return paths;
} 
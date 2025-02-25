import admin from 'functions/admin';
import Profile from 'Components/Profile';

const Page = async ({ params }) => {
  const db = admin.firestore();
  const profileSnaps = await db.collection('users').doc(params.id).get();
  const safeData = profileSnaps.exists
    ? JSON.parse(JSON.stringify(profileSnaps.data()))
    : {};

  return <Profile data={safeData} profileId={params.id} />;
};

export default Page;

export async function generateStaticParams() {
  const db = admin.firestore();
  const profileSnaps = await db.collection('users').get();

  const paths = profileSnaps.docs.map((doc) => ({
    params: { id: doc.id },
  }));

  return paths;
}

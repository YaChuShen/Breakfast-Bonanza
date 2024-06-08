import admin from 'functions/admin';
import Profile from 'Components/Profile';

const Page = async ({ params }) => {
  const db = admin.firestore();
  const profieSnaps = await db.collection('users').doc(params.id).get();
  const data = profieSnaps.data();
  if (data) {
    delete data.password;
  }

  return (
    <Profile
      data={JSON.parse(JSON.stringify(data ?? {}) ?? {})}
      profileId={params.id}
    />
  );
};

export default Page;

export async function generateStaticParams() {
  const db = admin.firestore();
  const profieSnaps = await db.collection('users').get();

  const paths = profieSnaps.docs.map((doc) => ({
    params: { id: doc.id },
  }));

  return paths;
}

import admin from 'functions/admin';
import { NextResponse } from 'next/server';
import { LEVEL2_SCORE } from 'contents/rules';

export async function POST(request) {
  const { profileId, score } = await request?.json();
  const db = admin.firestore();

  try {
    let isLevel2 = false;
    const userDocumentSnapshot = await db
      .collection('users')
      .doc(profileId)
      .get();

    console.log('userDocumentSnapshot', userDocumentSnapshot);
    console.log('LEVEL2_SCORE', LEVEL2_SCORE);
    if (userDocumentSnapshot.exists) {
      const userData = userDocumentSnapshot.data();
      isLevel2 = userData.isLevel2 || score >= LEVEL2_SCORE;
    } else {
      console.log(`No document found for profileId: ${profileId}`);
    }

    await db
      .collection('users')
      .doc(profileId)
      .update({
        score: admin.firestore.FieldValue.arrayUnion(score),
        lastPlayTime: admin.firestore.FieldValue.serverTimestamp(),
        isLevel2,
      });
    return NextResponse.json({
      status: 200,
    });
  } catch (e) {
    console.error('Error fetching user data:', e);
    return NextResponse.json(
      {
        message: '',
      },
      {
        status: 400,
      }
    );
  }
}

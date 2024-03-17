import admin from 'functions/admin';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request) {
  const { profileId, score } = await request?.json();
  const db = admin.firestore();
  let res = NextResponse.next();

  try {
    await db
      .collection('users')
      .doc(profileId)
      .update({
        score: admin.firestore.FieldValue.arrayUnion(score),
        lastPlayTime: admin.firestore.FieldValue.serverTimestamp(),
      });
    return NextResponse.json({
      status: 200,
    });
  } catch (e) {
    console.error(e);
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

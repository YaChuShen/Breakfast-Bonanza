import { NextResponse } from 'next/server';
import admin from 'functions/admin';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db = admin.firestore();
    const profileSnaps = await db.collection('users').doc(params.id).get();

    if (!profileSnaps.exists) {
      return NextResponse.json(
        {
          isLevel2: false,
          name: '',
          email: '',
        },
        { status: 404 }
      );
    }

    const data = profileSnaps.data();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching profile data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile data' },
      { status: 500 }
    );
  }
} 
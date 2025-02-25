import admin from 'functions/admin';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { NextAuthOptions } from 'pages/api/auth/[...nextauth]';

const TOP_RANKINGS = 5;

export async function POST(request) {
  try {
    const { profileId, score, name, timerStatus, timestamp } =
      await request.json();
    const timeDiff = Date.now() - timestamp;

    if (timerStatus !== 'end' && timeDiff > 5000) {
      return NextResponse.json(
        {
          status: 400,
          error: 'Suspicious game duration',
        },
        { status: 400 }
      );
    }

    const session = await getServerSession(NextAuthOptions);

    const realtimeDb = admin.database();
    const db = admin.firestore();

    const rankingsSnapshot = await realtimeDb.ref('rankings').once('value');
    const currentRankings = rankingsSnapshot.val() || [];
    // Get the current 5th place score
    const lowestTopScore =
      currentRankings.length >= TOP_RANKINGS
        ? currentRankings[currentRankings.length - 1].score
        : 0;

    if (profileId && session) {
      await db.collection('leaderboard').doc(profileId).set({
        score,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        profileId,
        name,
      });

      // Only update the leaderboard if the score might make it to top 5
      if (score > lowestTopScore || currentRankings.length < TOP_RANKINGS) {
        // Check if the player is currently on the leaderboard
        const playerRankIndex = currentRankings.findIndex(
          (r) => r.profileId === profileId
        );

        let newRankings = [...currentRankings];

        if (playerRankIndex !== -1) {
          newRankings.splice(playerRankIndex, 1);
        }

        newRankings.push({ profileId, score, name });

        newRankings = newRankings
          .sort((a, b) => b.score - a.score)
          .slice(0, TOP_RANKINGS)
          .map((rank, index) => ({
            ...rank,
            rank: index + 1,
          }));

        const newRank =
          newRankings.find((r) => r.profileId === profileId)?.rank || null;

        await realtimeDb.ref('rankings').set(newRankings);

        return NextResponse.json({
          status: 200,
          rankings: newRankings,
          newRank,
        });
      }

      return NextResponse.json({
        status: 200,
        rankings: currentRankings,
        message: 'Score updated but not in top 5',
      });
    }
    // for not login user
    else {
      const isTopFive =
        score > lowestTopScore || currentRankings.length < TOP_RANKINGS;

      return NextResponse.json({
        status: 200,
        rankings: currentRankings,
        isTopFive,
        message: isTopFive
          ? 'Score qualifies for top 5! Please login to save.'
          : 'Score not in top 5',
      });
    }
  } catch (error) {
    console.error('Error in leaderboard API:', error);
    return NextResponse.json(
      {
        status: 500,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

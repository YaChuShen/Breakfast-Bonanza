import admin from 'functions/admin';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { profileId, score } = body;
    const realtimeDb = admin.database();
    const db = admin.firestore();

    const rankingsSnapshot = await realtimeDb.ref('rankings').once('value');
    const currentRankings = rankingsSnapshot.val() || [];

    console.log('profileID', profileId);

    // 取得當前第10名的分數
    const lowestTopScore =
      currentRankings.length >= 10
        ? currentRankings[currentRankings.length - 1].score
        : 0;

    if (profileId) {
      await db.collection('leaderboard').doc(profileId).set({
        score,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        profileId,
      });

      // 只有當分數可能進入前10名時才更新排行榜
      if (score > lowestTopScore || currentRankings.length < 10) {
        // 找到玩家目前是否在排行榜中
        const playerRankIndex = currentRankings.findIndex(
          (r) => r.profileId === profileId
        );

        let newRankings = [...currentRankings];

        // 如果玩家已在排行榜中，先移除舊記錄
        if (playerRankIndex !== -1) {
          newRankings.splice(playerRankIndex, 1);
        }

        newRankings.push({ profileId, score });

        newRankings = newRankings
          .sort((a, b) => b.score - a.score)
          .slice(0, 10)
          .map((rank, index) => ({
            ...rank,
            rank: index + 1,
          }));

        await realtimeDb.ref('rankings').set(newRankings);

        return NextResponse.json({
          status: 200,
          rankings: newRankings,
        });
      }

      return NextResponse.json({
        status: 200,
        message: 'Score updated but not in top 10',
      });
    }
    // for not login user
    else {
      const isTopTen = score > lowestTopScore || currentRankings.length < 10;

      return NextResponse.json({
        status: 200,
        rankings: currentRankings,
        isTopTen,
        message: isTopTen
          ? 'Score qualifies for top 10! Please login to save.'
          : 'Score not in top 10',
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

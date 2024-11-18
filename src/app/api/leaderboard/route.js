import admin from 'functions/admin';
import { NextResponse } from 'next/server';

const TOP_RANKINGS = 5;

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { profileId, score, name } = body;
    const realtimeDb = admin.database();
    const db = admin.firestore();

    const rankingsSnapshot = await realtimeDb.ref('rankings').once('value');
    const currentRankings = rankingsSnapshot.val() || [];

    // 取得當前第5名的分數
    const lowestTopScore =
      currentRankings.length >= TOP_RANKINGS
        ? currentRankings[currentRankings.length - 1].score
        : 0;

    if (profileId) {
      await db.collection('leaderboard').doc(profileId).set({
        score,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        profileId,
        name,
      });

      // 只有當分數可能進入前5名時才更新排行榜
      if (score > lowestTopScore || currentRankings.length < TOP_RANKINGS) {
        // 找到玩家目前是否在排行榜中
        const playerRankIndex = currentRankings.findIndex(
          (r) => r.profileId === profileId
        );

        let newRankings = [...currentRankings];

        // 如果玩家已在排行榜中，先移除舊記錄
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

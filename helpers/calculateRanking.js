import { TOP_RANKINGS } from 'contents/rules';

const calculateRanking = (score, currentLeaderboard, profileId) => {
  const lowestTopScore =
    currentLeaderboard.length >= TOP_RANKINGS
      ? currentLeaderboard[currentLeaderboard.length - 1].score
      : 0;

  if (profileId) {
    if (score > lowestTopScore || currentLeaderboard.length < TOP_RANKINGS) {
      // Check if the player is currently on the leaderboard
      const playerRankIndex = currentLeaderboard.findIndex(
        (r) => r.profileId === profileId
      );

      let newRankings = [...currentLeaderboard];

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

      return {
        status: 200,
        rankings: newRankings,
        newRank,
      };

      // await realtimeDb.ref('rankings').set(newRankings);

      // return NextResponse.json({
      //   status: 200,
      //   rankings: newRankings,
      //   newRank,
      // });
    }
  } else {
    const isTopFive =
      score > lowestTopScore || currentLeaderboard.length < TOP_RANKINGS;

    return {
      newLeaderboard: currentLeaderboard,
      isTopFive,
    };
  }
};

export default calculateRanking;

import { TOP_RANKINGS } from 'contents/rules';

const calculateRanking = (score, currentLeaderboard, profileId, name) => {
  const lowestTopScore =
    currentLeaderboard.length >= TOP_RANKINGS
      ? currentLeaderboard[currentLeaderboard.length - 1].score
      : 0;

  const isTopFive =
    score > lowestTopScore || currentLeaderboard.length < TOP_RANKINGS;

  if (profileId) {
    if (isTopFive) {
      // Check if the player is currently on the leaderboard
      const playerRankIndex = currentLeaderboard.findIndex(
        (r) => r.profileId === profileId
      );

      let newRankings = [...currentLeaderboard];

      // If player is already on the leaderboard, remove the old record first
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

      return {
        newLeaderboard: newRankings,
        isTopFive,
      };
    }

    return {
      newLeaderboard: currentLeaderboard,
      isTopFive,
    };
  } else {
    return {
      newLeaderboard: currentLeaderboard,
      isTopFive,
    };
  }
};

export default calculateRanking;

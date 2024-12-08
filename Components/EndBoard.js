'use client';

import { Button, VStack, HStack, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { LEVEL2_SCORE } from 'contents/rules';

import TotalScore from './endBoard/TotalScore';
import LevelUp from './endBoard/LevelUp';
import Leaderboard from './endBoard/Leaderboard';
import { selectGameConfig } from 'store/features/gameConfigSlice';
import { useSelector } from 'react-redux';
import MotionBoard from './MotionBoard';

const endBoardVariants = {
  borderRadius: '3xl',
  p: '5',
  flex: 1,
  boxShadow: '0px 2px 20px 1px rgba(0, 0, 0, 0.15)',
};

const EndBoard = ({ score, isRunning, session, isLevel2, ...props }) => {
  const [isEnterLeaderboard, setIsEnterLeaderboard] = useState(false);
  const [newRankBoard, setNewRankBoard] = useState(null);
  const { timerStatus } = useSelector(selectGameConfig);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pointsResult, leaderboardResult] = await Promise.allSettled([
          fetch('/api/pointsTable', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              score: score ?? 0,
              profileId: session?.profileId,
              timerStatus,
            }),
          }),
          fetch('/api/leaderboard', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              score: score ?? 0,
              profileId: session?.profileId,
              name: session?.name,
              timerStatus,
              timestamp: Date.now(),
            }),
          }),
        ]);

        if (pointsResult.status === 'rejected') {
          console.error('Points API failed:', pointsResult.reason);
        }

        if (leaderboardResult.status === 'fulfilled') {
          const data = await leaderboardResult.value.json();
          console.log('data', data);
          setIsEnterLeaderboard(data.isTopFive ?? data.newRank);
          setNewRankBoard(data.rankings);
          return data;
        } else {
          console.error('Leaderboard API failed:', leaderboardResult.reason);
        }
      } catch (error) {
        console.error('Error in fetchData:', error);
      }
    };
    fetchData();
  }, []);

  const showLevelUpMessege = score > LEVEL2_SCORE && !isLevel2;
  return (
    <MotionBoard {...props}>
      {!isRunning && (
        <VStack w="100%" spacing={{ lg: '1em', '2xl': '2em' }} fontWeight={700}>
          <TotalScore
            showLevelUpMessege={showLevelUpMessege}
            score={score}
            isEnterLeaderboard={isEnterLeaderboard}
            isLogin={session?.profileId}
          />
          <HStack alignItems="stretch" px="2em" spacing={5}>
            {showLevelUpMessege && (
              <LevelUp endBoardVariants={endBoardVariants} />
            )}

            {(newRankBoard || !isRunning) && (
              <Leaderboard
                newRankBoard={newRankBoard}
                endBoardVariants={endBoardVariants}
                isLoading={!newRankBoard}
                profileId={session?.profileId}
              />
            )}
          </HStack>
          <Button
            type="submit"
            bg="red.500"
            color="white"
            fontSize="24px"
            py="5"
            px="10"
            size="xl"
            borderRadius="20px"
            letterSpacing="1px"
            _hover={{ bg: 'red.700', color: 'white' }}
            fontWeight={900}
          >
            Re-START
          </Button>
        </VStack>
      )}
    </MotionBoard>
  );
};

export default EndBoard;

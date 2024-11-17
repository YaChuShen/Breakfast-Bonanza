'use client';

import { Box, Button, VStack, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { LEVEL2_SCORE } from 'contents/rules';

import TotalScore from './endBoard/TotalScore';
import LevelUp from './endBoard/LevelUp';
import GuestLeaderboard from './endBoard/GuestLeaderboard';
import Leaderboard from './endBoard/Leaderboard';

const MotionComponent = motion(Box);

const endBoardVariants = {
  borderRadius: '3xl',
  p: '5',
  flex: 1,
  boxShadow: '0px 2px 20px 1px rgba(0, 0, 0, 0.15)',
};

const EndBoard = ({ score, isRunning, session, isLevel2, ...props }) => {
  const [isEnterLeaderboard, setIsEnterLeaderboard] = useState(false);
  const [newRankBoard, setNewRankBoard] = useState(null);

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
            }),
          }),
        ]);

        if (pointsResult.status === 'rejected') {
          console.error('Points API failed:', pointsResult.reason);
        }

        if (leaderboardResult.status === 'fulfilled') {
          const data = await leaderboardResult.value.json();
          console.log('排行榜結果:', data);
          setIsEnterLeaderboard(data.isTopTen);
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
    <MotionComponent
      py={{ md: '2em', xl: '2.5em' }}
      bg="rgba(255, 255, 255, 0.9)"
      w="60%"
      pos="fixed"
      top="10%"
      left="18.5%"
      zIndex={20}
      initial={{ opacity: 0.2, x: 0, y: -600, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      exit={{
        opacity: 0,
        y: -300,
        scale: 0.8,
        transition: { duration: 0.3, type: 'spring' },
      }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
      borderRadius="80px"
      border="10px solid #db542c"
      {...props}
    >
      {!isRunning && (
        <VStack w="100%" spacing="2em" fontWeight={700}>
          <TotalScore showLevelUpMessege={showLevelUpMessege} score={score} />
          <HStack alignItems="stretch" px="2em" spacing={5}>
            {showLevelUpMessege && (
              <LevelUp endBoardVariants={endBoardVariants} />
            )}
            {isEnterLeaderboard && (
              <GuestLeaderboard
                isEnterLeaderboard={isEnterLeaderboard}
                endBoardVariants={endBoardVariants}
              />
            )}
            {newRankBoard && (
              <Leaderboard
                newRankBoard={newRankBoard}
                endBoardVariants={endBoardVariants}
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
    </MotionComponent>
  );
};

export default EndBoard;

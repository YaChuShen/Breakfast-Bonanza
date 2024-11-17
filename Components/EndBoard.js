'use client';

import {
  Box,
  Button,
  Image,
  Text,
  VStack,
  HStack,
  Stack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { LEVEL2_SCORE } from 'contents/rules';
import { useRouter } from 'next/navigation';

const MotionComponent = motion(Box);

const EndBoard = ({ score, isRunning, session, isLevel2, ...props }) => {
  const [isEnterLeaderboard, setIsEnterLeaderboard] = useState(false);
  const router = useRouter();
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
      py={{ md: '5em', xl: '2.5em' }}
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
          <VStack w="100%" color="red.500" spacing={0}>
            <Text fontSize="50px">
              {showLevelUpMessege ? 'Level up !!' : 'Game over'}
            </Text>
            <Text fontSize="20px" color="gray.700">
              Your total scroe is
              <Text color="red.500" fontSize="3em" textAlign="center">
                {score}
              </Text>
            </Text>
          </VStack>
          <HStack alignItems="stretch" px="2em" spacing={5}>
            {showLevelUpMessege && (
              <Stack
                alignItems="center"
                color="gray.700"
                bg="white"
                borderRadius="3xl"
                p="5"
                flex={1}
              >
                <Text fontSize="20px">Unlock new ingredients!</Text>
                <Text textAlign="center" fontWeight={500}>
                  Next, there are various combinations waiting for you to
                  complete.
                </Text>
                <HStack>
                  <Image src={'/bacon.svg'} w="5em" alt="bacon" />
                  <Image src={'/rosemarry.svg'} w="5em" alt="rosemarry" />
                </HStack>
              </Stack>
            )}
            {isEnterLeaderboard && (
              <VStack
                color="gray.700"
                spacing={1}
                bg="gray.100"
                borderRadius="3xl"
                p="5"
                flex={1}
              >
                <Text fontSize="20px">Congratulations!</Text>
                <Text textAlign="center" fontWeight={500}>
                  {isEnterLeaderboard
                    ? ` You've made it to the top 10 of the leaderboard! Sign Up now to secure your impressive record.`
                    : ` 'Want to track your scores? Go ahead and register now!'`}
                </Text>
                <Box mt="0.5em">
                  <Button
                    size="sm"
                    borderRadius="xl"
                    colorScheme="red"
                    variant="outline"
                    onClick={() => router.push('/register')}
                  >
                    Sign Up
                  </Button>
                </Box>
              </VStack>
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

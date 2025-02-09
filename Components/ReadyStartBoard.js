'use client';
import React from 'react';

import { Button, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { timerStatus } from 'store/features/gameConfigSlice';
import MotionBoard from './MotionBoard';
import { useRouter } from 'next/navigation';

const ReadyStartBoard = ({ session, timerStart }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <MotionBoard py={{ md: '2em', xl: '6em' }} px="2em">
      <VStack w="100%" spacing={10} fontWeight={500}>
        <VStack w="100%">
          <Image src="/breakfast_bonanza_logo.svg" w="60%" alt="sereneShen" />
        </VStack>
        {session ? (
          <VStack fontWeight={700}>
            <Text color="gray.700">
              Hi,{' '}
              <Text as="span" fontWeight={900} fontSize="2xl">
                {session?.user?.name}
              </Text>
            </Text>
            <Text>Press Start to begin the timer!</Text>
          </VStack>
        ) : (
          <VStack textAlign="center">
            <Text>You are not logged in yet.</Text>
            <Text>
              Log in or Sign up now to record your game score and enter the
              leaderboard!
            </Text>
          </VStack>
        )}
        <Button
          onClick={() => {
            timerStart();
            dispatch(timerStatus({ status: 'gameRunning' }));
          }}
          bg="red.500"
          color="white"
          fontSize="24px"
          py="5"
          px="12"
          size="xl"
          borderRadius="20px"
          letterSpacing="1px"
          _hover={{ bg: 'red.400', color: 'white' }}
          fontWeight={900}
        >
          Start
        </Button>
        {!session && (
          <HStack>
            <Button
              cursor="pointer"
              borderRadius="12px"
              color="red.500"
              onClick={() => router.push('auth/signin')}
            >
              Login
            </Button>
            <Button
              borderRadius="12px"
              border=" 2px solid #978e8b"
              flex={1}
              onClick={() => router.push('/register')}
              variant="outline"
            >
              Sign Up
            </Button>
          </HStack>
        )}
      </VStack>
    </MotionBoard>
  );
};

export default ReadyStartBoard;

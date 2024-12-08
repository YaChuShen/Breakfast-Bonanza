import React from 'react';

import { Button, Image, Text, VStack } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { timerStatus } from 'store/features/gameConfigSlice';
import Link from 'next/link';
import MotionBoard from './MotionBoard';
import { signOut } from 'next-auth/react';

const ReadyStartBoard = ({ session, timerStart }) => {
  const dispatch = useDispatch();

  return (
    <MotionBoard py={{ md: '2em', xl: '6em' }} px="2em">
      <VStack w="100%" spacing={10}>
        <VStack w="100%">
          <Image src="/breakfast_bonanza_logo.svg" w="60%" alt="sereneShen" />
        </VStack>
        {session ? (
          <VStack fontWeight={500}>
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
              Log in or sign up now to record your game score and enter the
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
          <Link href="/auth/signin">
            <Text
              cursor="pointer"
              textDecoration="underline"
              color="red.500"
              onClick={() => window.open('auth/signin', '_self')}
            >
              Go to login
            </Text>
          </Link>
        )}
      </VStack>
    </MotionBoard>
  );
};

export default ReadyStartBoard;

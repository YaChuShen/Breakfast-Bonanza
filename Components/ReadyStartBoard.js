import React from 'react';

import { Box, Button, Image, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { timerStatus } from 'store/features/gameConfigSlice';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

const MotionComponent = motion(Box);

const ReadyStartBoard = ({ session, timerStart }) => {
  const dispatch = useDispatch();

  return (
    <MotionComponent
      w="60%"
      py={{ md: '5em', xl: '7em' }}
      bg="rgba(255, 255, 255, 0.9)"
      pos="fixed"
      top="20%"
      left="20%"
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
    >
      <VStack w="100%" spacing={10}>
        <VStack w="100%">
          <Image src="/breakfast_bonanza_logo.svg" w="60%" />
          {/* <Text color="red.500" fontSize="24px" fontWeight={700}>
            Are you ready to start?
          </Text> */}
          {/* <Text>Press Start to begin the timer</Text> */}
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
          <VStack>
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
        {session ? (
          <Text onClick={signOut} textDecoration="underline" cursor="pointer">
            logout
          </Text>
        ) : (
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
    </MotionComponent>
  );
};

export default ReadyStartBoard;

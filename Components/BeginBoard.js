'use client';

import { Button, HStack, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { timerStatus } from 'store/features/gameConfigSlice';
import { useTour } from '@reactour/tour';
import MotionBoard from './MotionBoard';

const BeginBoard = ({ session }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { setIsOpen } = useTour();

  return (
    <MotionBoard py="2.5em">
      <VStack w="100%" spacing={10}>
        <VStack w="100%">
          <Image src="/breakfast_bonanza_logo.svg" w="60%" alt="SereneShen" />
          <Text color="red.500" fontSize="24px" fontWeight={700}>
            Make Maximum Breakfasts in Limited Time
          </Text>
        </VStack>
        {session && (
          <VStack fontWeight={500}>
            <Text color="gray.700">
              Hi,{' '}
              <Text as="span" fontWeight={900} fontSize="2xl">
                {session?.user?.name}
              </Text>
            </Text>
            <Text>{`Let's start the game!`}</Text>
          </VStack>
        )}
        <Button
          onClick={() => {
            setIsOpen(true);
            dispatch(timerStatus({ status: 'touring' }));
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
          Continue
        </Button>
        <VStack spacing={0}>
          {session ? (
            <Text onClick={signOut} textDecoration="underline" cursor="pointer">
              logout
            </Text>
          ) : (
            <HStack>
              <Button
                borderRadius="12px"
                border=" 2px solid #d67558"
                flex={1}
                variant="outline"
                onClick={() => router.push('auth/signin')}
              >
                LogIn
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
      </VStack>
    </MotionBoard>
  );
};

export default BeginBoard;

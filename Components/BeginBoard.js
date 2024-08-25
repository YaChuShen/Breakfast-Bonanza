'use client';

import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { timerStatus } from 'store/features/gameConfigSlice';
import { useTour } from '@reactour/tour';

const MotionComponent = motion(Box);

const BeginBoard = ({ session }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { setIsOpen, isOpen } = useTour();

  return (
    <MotionComponent
      w="80%"
      py={{ md: '5em', xl: '7em' }}
      bg="rgba(255, 255, 255, 0.9)"
      pos="fixed"
      top="20%"
      left="10%"
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
          <Text color="red.500" fontSize="24px" fontWeight={700}>
            Make Maximum Breakfasts in Limited Time
          </Text>
        </VStack>
        {session && (
          <Text color="gray.700" fontWeight={700}>
            {`Hi ${session?.user?.name} Let's to start the game!`}
          </Text>
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
    </MotionComponent>
  );
};

export default BeginBoard;

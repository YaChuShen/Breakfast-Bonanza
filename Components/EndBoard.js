import {
  Box,
  Button,
  Image,
  Text,
  VStack,
  HStack,
  Stack,
  Flex,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { LEVEL2_SCORE } from 'contents/rules';
import { useDispatch } from 'react-redux';
import { timerStatus } from 'store/features/gameConfigSlice';

const MotionComponent = motion(Box);

const EndBoard = ({ score, isRunning, session, isLevel2, ...props }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await fetch('/api/pointsTable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          score: score ?? 0,
          profileId: session?.profileId,
        }),
      });
    };
    fetchData();
    // dispatch(timerStatus({ status: isRunning }));
  }, []);

  const showLevelUpMessege = score > LEVEL2_SCORE && !isLevel2;

  return (
    <MotionComponent
      py={{ md: '5em', xl: '7em' }}
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
        <VStack w="100%" spacing={10} fontWeight={700}>
          <VStack w="100%" color="red.500">
            <Text fontSize="50px">
              {showLevelUpMessege ? 'Level up !!' : 'Game over'}
            </Text>
            <Text fontSize="20px" color="gray.700">
              Your total scroe is
              <Text color="red.500" fontSize="4em" textAlign="center">
                {score}
              </Text>
            </Text>
            {showLevelUpMessege && (
              <Stack alignItems="center" color="gray.700">
                <Text fontSize="20px">Unlock new ingredients!</Text>
                <Text>
                  Next, there are various combinations waiting for you to
                  complete.
                </Text>
                <HStack>
                  <Image src={'/bacon.svg'} w="5em" />
                  <Image src={'/rosemarry.svg'} w="5em" />
                </HStack>
              </Stack>
            )}
          </VStack>
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

import { Box, Button, Image, Text, VStack, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { LEVEL2_SCORE } from 'contents/rules';

const MotionComponent = motion(Box);

const EndBoard = ({ score, isRunning, session, isLevel2, ...props }) => {
  useEffect(() => {
    const fetchData = async () => {
      await fetch('/api/pointsTable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          score: score ?? 0,
          profileId: session?.id,
        }),
      });
    };
    fetchData();
  }, []);

  const showLevelUpMessege = score > LEVEL2_SCORE && !isLevel2;

  return (
    <MotionComponent
      w="80%"
      py={{ md: '5em', xl: '7em' }}
      bg="rgba(255, 255, 255, 0.9)"
      pos="fixed"
      top="10%"
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
      {...props}
    >
      {!isRunning && (
        <VStack w="100%" spacing={10}>
          <VStack w="100%" color="red.500">
            {/* <Image
              src="/breakfast_bonanza_logo.svg"
              w="30%"
              alt="breakfast_bonanza_logo"
            /> */}

            <Text fontSize="50px" fontWeight={700}>
              {showLevelUpMessege ? 'Level up !!' : 'Game over'}
            </Text>
            <Text fontSize="20px" fontWeight={700} color="gray.700">
              your total scroe is
              <Text color="red.500" fontSize="40px" textAlign="center">
                {score}
              </Text>
            </Text>
            <br />
            {showLevelUpMessege && (
              <Box>
                <Text fontSize="20px" fontWeight={700} color="gray.700">
                  Unlock new ingredients
                </Text>
                <HStack>
                  <Image src={'/bacon.svg'} w="5em" />
                  <Image src={'/rosemarry.svg'} w="5em" />
                </HStack>
              </Box>
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

import { Box, Divider, Text, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Timer from 'Components/Timer';

const ScoreSection = ({ score, seconds, minutes }) => {
  return (
    <Box
      zIndex={1}
      boxShadow="md"
      bg="gray.50"
      py="2"
      pos="fixed"
      right={10}
      top={10}
      w="100%"
      maxW="8em"
      px="2"
      borderRadius="13px"
    >
      <VStack>
        <Timer seconds={seconds} minutes={minutes} />
        <Divider borderWidth="1px" />
        <Text fontSize="24px" fontWeight={700} color="gray.600">
          {score ?? 0}
        </Text>
      </VStack>
    </Box>
  );
};

export default ScoreSection;

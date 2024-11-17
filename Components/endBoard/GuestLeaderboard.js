'use client';

import { Box, Button, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const GuestLeaderboard = ({ isEnterLeaderboard, endBoardVariants }) => {
  const router = useRouter();

  return (
    <VStack color="gray.700" spacing={1} bg="gray.50" {...endBoardVariants}>
      <Text fontSize="20px">Congratulations!</Text>
      <Text textAlign="center" fontWeight={500}>
        {isEnterLeaderboard
          ? ` You've made it to the top 5 of the leaderboard! Sign Up now to secure your impressive record.`
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
  );
};

export default GuestLeaderboard;

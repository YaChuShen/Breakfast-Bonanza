import {
  Box,
  Center,
  Divider,
  IconButton,
  SlideFade,
  Text,
  VStack,
  useDisclosure,
  HStack,
} from '@chakra-ui/react';
import React from 'react';
import Timer from 'Components/Timer';
import { MdArrowDropDown } from 'react-icons/md';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectOpponentScore } from 'store/features/socketSlice';

type ScoreSectionProps = {
  score: number;
  seconds: number;
  minutes: number;
  profileId: string;
  isSingin: boolean;
};

const ScoreSection = ({
  score,
  seconds,
  minutes,
  isSingin,
}: ScoreSectionProps) => {
  const { isOpen, onToggle } = useDisclosure();
  const router = useRouter();
  const opponentScore = useSelector(selectOpponentScore);

  return (
    <Box
      pos="fixed"
      top="0"
      right="0"
      // left="0"
      zIndex="3"
      bg="white"
      boxShadow="0px 2px 20px 1px rgba(0, 0, 0, 0.15)"
    >
      <HStack justify="space-between" px="2em" py="1em">
        <VStack align="start" spacing={0}>
          <Text fontSize="sm" color="gray.500">
            Your Score
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color="red.500">
            {score}
          </Text>
        </VStack>
        <Timer seconds={seconds} minutes={minutes} />
        <VStack align="end" spacing={0}>
          <Text fontSize="sm" color="gray.500">
            Opponent Score
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color="blue.500">
            {opponentScore}
          </Text>
        </VStack>
      </HStack>
      <Divider />
      <Center>
        <IconButton
          aria-label="Toggle menu"
          icon={<MdArrowDropDown />}
          variant="ghost"
          onClick={onToggle}
          transform={isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}
          transition="transform 0.2s"
        />
      </Center>
      <SlideFade in={isOpen}>
        <Box p={4} bg="white">
          {isSingin ? (
            <Text
              cursor="pointer"
              onClick={() => {
                signOut();
                router.push('/');
              }}
            >
              Sign Out
            </Text>
          ) : (
            <Text cursor="pointer" onClick={() => router.push('/register')}>
              Sign Up
            </Text>
          )}
        </Box>
      </SlideFade>
    </Box>
  );
};

export default ScoreSection;

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
import React, { useEffect } from 'react';
import Timer from 'Components/Timer';
import { MdArrowDropDown } from 'react-icons/md';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateOpponentScore,
  selectMutipleModeData,
} from 'store/features/socketSlice';
import { useSocket } from 'src/app/socketIoProvider';

type ScoreSectionProps = {
  score: number;
  seconds: number;
  minutes: number;
  isSingin: boolean;
  profileId: string;
};

const ScoreSection = ({
  score,
  seconds,
  minutes,
  isSingin,
  profileId,
}: ScoreSectionProps) => {
  const { isOpen, onToggle } = useDisclosure();
  const router = useRouter();
  const mutipleModeData = useSelector(selectMutipleModeData);
  const socket = useSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleOpponentScoreUpdate = (data: {
      score: number;
      playerName: string;
      playerId: string;
    }) => {
      if (data.playerId !== profileId) {
        dispatch(updateOpponentScore(data));
      }
    };
    if (socket) {
      socket.on('opponentScoreUpdate', handleOpponentScoreUpdate);
    }

    return () => {
      if (socket) {
        socket.off('opponentScoreUpdate', handleOpponentScoreUpdate);
      }
    };
  }, [socket, dispatch]);

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
            {mutipleModeData.opponentName
              ? `${mutipleModeData.opponentName}'s Score`
              : 'Opponent Score'}
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color="blue.500">
            {mutipleModeData.opponentScore}
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

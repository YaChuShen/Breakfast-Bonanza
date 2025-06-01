import React from 'react';
import { Badge, Text, VStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCompetitorInfo,
  selectRoomId,
  selectIsHost,
  selectIsOpponentConnected,
} from 'store/features/socketSlice';
import JoinRoom from './MutipleMode/JoinRoom';
import CreateRoom from './MutipleMode/CreateRoom';
import useMutipleModeSocketEvents from 'hooks/useMutipleModeSocketEvents';
import ReadyToPlay from './ReadyToPlay';

const MutiplePlayerMode = ({ timerStart }: { timerStart: () => void }) => {
  const dispatch = useDispatch();
  const competitorInfo = useSelector(selectCompetitorInfo);
  const roomId = useSelector(selectRoomId);
  const isHost = useSelector(selectIsHost);
  const isOpponentConnected = useSelector(selectIsOpponentConnected);

  useMutipleModeSocketEvents(dispatch, isHost, timerStart);

  const hostSection =
    !isOpponentConnected && competitorInfo ? (
      <Text>OPPONENT DISCONNECTED!!!</Text>
    ) : (
      <VStack spacing={2}>
        <Badge colorScheme="green">HOST</Badge>
        <Text>Room ID: {roomId}</Text>
        <Text>Share this room ID with your friend!</Text>
        {competitorInfo && <Text>Competitor: {competitorInfo}</Text>}
      </VStack>
    );

  const opponentSection = !isOpponentConnected ? (
    <Text>HOST DISCONNECTED!!!</Text>
  ) : (
    <VStack spacing={2}>
      <Text>Room ID: {roomId}</Text>
      <Text>OPPONENT</Text>
      {competitorInfo && <Text>Competitor: {competitorInfo}</Text>}
    </VStack>
  );

  return (
    <VStack spacing={4} bg="red.500" p={4} borderRadius="10px">
      <Text fontSize="20px" fontWeight={700}>
        Multiplayer Mode
      </Text>
      <Text>Compete with a friend in breakfast-making</Text>
      {!roomId ? (
        <VStack spacing={2}>
          <CreateRoom />
          <Text>or</Text>
          <JoinRoom />
        </VStack>
      ) : isHost ? (
        hostSection
      ) : (
        opponentSection
      )}
      <ReadyToPlay roomId={roomId} />
    </VStack>
  );
};

export default MutiplePlayerMode;

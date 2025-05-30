import React from 'react';
import { Badge, Button, Text, VStack, useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSocket,
  selectCompetitorInfo,
  selectRoomId,
  selectIsHost,
  selectIsOpponentConnected,
  selectIsHostDisconnected,
} from 'store/features/socketSlice';
import { timerStatus } from 'store/features/gameConfigSlice';
import JoinRoom from './MutipleMode/JoinRoom';
import CreateRoom from './MutipleMode/CreateRoom';
import useMutipleModeSocketEvents from 'hooks/useMutipleModeSocketEvents';
import { SocketMessage } from 'lib/type/socketMessage';

const MutiplePlayerMode = () => {
  const dispatch = useDispatch();
  const socketMethods = useSelector(selectSocket) as SocketMessage;
  const competitorInfo = useSelector(selectCompetitorInfo);
  const roomId = useSelector(selectRoomId);
  const isHost = useSelector(selectIsHost);
  const isOpponentConnected = useSelector(selectIsOpponentConnected);
  const isHostDisconnected = useSelector(selectIsHostDisconnected);

  console.log({ isOpponentConnected });

  useMutipleModeSocketEvents(socketMethods, dispatch, isHost);

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
          <CreateRoom socketMethods={socketMethods} />
          <Text>or</Text>
          <JoinRoom socketMethods={socketMethods} />
        </VStack>
      ) : isHost ? (
        hostSection
      ) : (
        opponentSection
      )}
    </VStack>
  );
};

export default MutiplePlayerMode;

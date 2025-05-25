import React from 'react';
import { Button, Text, VStack, useToast } from '@chakra-ui/react';
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

  useMutipleModeSocketEvents(socketMethods, dispatch, isHost);

  return (
    <VStack spacing={4} bg="red.500" p={4} borderRadius="10px">
      <Text fontSize="20px" fontWeight={700}>
        Multiplayer Mode
      </Text>
      <Text>Compete with a friend in breakfast-making</Text>
      {isHostDisconnected && !roomId && (
        <Text color="white" fontWeight="bold">
          Host disconnected! Please wait for them to rejoin or create a new
          room.
        </Text>
      )}
      {!roomId ? (
        <VStack spacing={2}>
          <CreateRoom socketMethods={socketMethods} />
          <Text>or</Text>
          <JoinRoom socketMethods={socketMethods} />
        </VStack>
      ) : (
        <VStack spacing={2}>
          <Text>Room ID: {roomId}</Text>
          {isHost && <Text>Share this room ID with your friend!</Text>}
          {competitorInfo && isOpponentConnected && (
            <Text>Competitor: {competitorInfo}</Text>
          )}
          {!isOpponentConnected && (
            <Text color="red.500" fontWeight="bold">
              Opponent disconnected! Please wait for them to rejoin or create a
              new room.
            </Text>
          )}
        </VStack>
      )}
    </VStack>
  );
};

export default MutiplePlayerMode;

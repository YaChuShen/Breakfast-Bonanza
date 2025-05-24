import React, { useEffect, useState } from 'react';
import { Button, Image, Text, VStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { selectSocket } from 'store/features/socketSlice';

const MutiplePlayerMode = () => {
  const socketMessage = useSelector(selectSocket);
  const [competitorInfo, setCompetitorInfo] = useState();
  const [roomId, setRoomId] = useState();
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    if (!socketMessage?.socket) return;

    const handlePlayerJoined = (data) => {
      console.log('Player joined:', data);
      setCompetitorInfo(data?.playerName);
    };

    socketMessage.socket.on('playerJoined', handlePlayerJoined);

    return () => {
      socketMessage.socket.off('playerJoined', handlePlayerJoined);
    };
  }, [socketMessage]);

  const handleCreateRoom = () => {
    if (socketMessage?.socket) {
      const newRoomId = Math.random().toString(36).substring(2, 8);
      setRoomId(newRoomId);
      setIsHost(true);
      socketMessage.socket.emit('joinRoom', newRoomId);
      console.log('Created room:', newRoomId);
    }
  };

  const handleJoinRoom = (existingRoomId) => {
    if (socketMessage?.socket) {
      setRoomId(existingRoomId);
      setIsHost(false);
      socketMessage.socket.emit('joinRoom', existingRoomId);
      console.log('Joined room:', existingRoomId);
    }
  };
  return (
    <VStack spacing={4} bg="red.500" p={4} borderRadius="10px">
      <Text fontSize="20px" fontWeight={700}>
        Multiplayer Mode
      </Text>
      <Text>Compete with a friend in breakfast-making</Text>

      {!roomId ? (
        <VStack spacing={2}>
          <Button onClick={handleCreateRoom}>Create Room</Button>
          <Text>or</Text>
          <Button
            onClick={() => handleJoinRoom(prompt('Enter room ID:') || '')}
          >
            Join Room
          </Button>
        </VStack>
      ) : (
        <VStack spacing={2}>
          <Text>Room ID: {roomId}</Text>
          {isHost && <Text>Share this room ID with your friend!</Text>}
          {competitorInfo && <Text>Competitor: {competitorInfo}</Text>}
        </VStack>
      )}
    </VStack>
  );
};

export default MutiplePlayerMode;

import { Button } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { setRoomId, setIsHost } from 'store/features/socketSlice';
import { useSocket } from '../../src/app/SocketProvider';

const JoinRoom = () => {
  const dispatch = useDispatch();
  const socket = useSocket();

  const handleJoinRoom = (existingRoomId: string) => {
    if (socket) {
      dispatch(setRoomId(existingRoomId));
      dispatch(setIsHost(false));
      socket.emit('joinRoom', existingRoomId);
    }
  };
  return (
    <Button onClick={() => handleJoinRoom(prompt('Enter room ID:') || '')}>
      Join Room
    </Button>
  );
};

export default JoinRoom;

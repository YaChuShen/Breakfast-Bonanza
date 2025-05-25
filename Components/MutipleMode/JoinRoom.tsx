import { Button } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { setRoomId, setIsHost } from 'store/features/socketSlice';

interface JoinRoomProps {
  socketMethods: {
    socket: {
      emit: (event: string, data: any) => void;
    };
  };
}

const JoinRoom = ({ socketMethods }: JoinRoomProps) => {
  const dispatch = useDispatch();

  const handleJoinRoom = (existingRoomId: string) => {
    if (socketMethods?.socket) {
      dispatch(setRoomId(existingRoomId));
      dispatch(setIsHost(false));
      socketMethods.socket.emit('joinRoom', existingRoomId);
    }
  };
  return (
    <Button onClick={() => handleJoinRoom(prompt('Enter room ID:') || '')}>
      Join Room
    </Button>
  );
};

export default JoinRoom;

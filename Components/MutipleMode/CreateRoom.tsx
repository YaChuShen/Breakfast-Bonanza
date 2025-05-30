import { Button } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { setRoomId, setIsHost } from 'store/features/socketSlice';

interface CreateRoomProps {
  socketMethods: {
    socket: {
      emit: (event: string, data: any) => void;
    };
  };
}

const CreateRoom = ({ socketMethods }: CreateRoomProps) => {
  const dispatch = useDispatch();

  const handleCreateRoom = () => {
    if (socketMethods?.socket) {
      const newRoomId = Math.random().toString(36).substring(2, 8);
      dispatch(setRoomId(newRoomId));
      dispatch(setIsHost(true));
      socketMethods.socket.emit('createRoom', newRoomId);
    }
  };
  return <Button onClick={handleCreateRoom}>Create Room</Button>;
};

export default CreateRoom;

import { Button } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useSocket } from 'src/app/SocketProvider';
import { setRoomId, setIsHost } from 'store/features/socketSlice';

const CreateRoom = () => {
  const dispatch = useDispatch();
  const socket = useSocket();

  const handleCreateRoom = () => {
    if (socket) {
      const newRoomId = Math.random().toString(36).substring(2, 8);
      dispatch(setRoomId(newRoomId));
      dispatch(setIsHost(true));
      socket.emit('createRoom', newRoomId);
    }
  };
  return <Button onClick={handleCreateRoom}>Create Room</Button>;
};

export default CreateRoom;

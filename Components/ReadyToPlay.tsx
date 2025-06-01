import { Button } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectIsHost } from 'store/features/socketSlice';
import { useState } from 'react';
import StartButton from './StartButton';
import { selectIsPlayerReady } from 'store/features/socketSlice';
import { useSocket } from '../src/app/socketIoProvider';

interface ReadyToPlayProps {
  roomId: string;
}

const ReadyToPlay = ({ roomId }: ReadyToPlayProps) => {
  const isHost = useSelector(selectIsHost);
  const isPlayerReady = useSelector(selectIsPlayerReady);
  const [isReady, setIsReady] = useState(false);
  const socket = useSocket();

  const handleStartGame = () => {
    if (isHost) {
      socket.emit('gameStart', roomId);
    }
  };

  const handleReadyToPlay = () => {
    socket.emit('playerReady', roomId);
    setIsReady(true);
  };

  return isHost ? (
    <StartButton onClick={handleStartGame} disabled={!isPlayerReady} />
  ) : (
    <Button onClick={handleReadyToPlay} isDisabled={isReady}>
      I'm ready to play
    </Button>
  );
};

export default ReadyToPlay;

import {
  handlePlayerJoined,
  handlePlayerDisconnected,
  handleHostInfo,
  handlePlayerReady,
  updateOpponentScore,
} from 'store/features/socketSlice';
import { useEffect } from 'react';
import { timerStatus } from 'store/features/gameConfigSlice';
import { useSocket } from '../src/app/socketIoProvider';

interface PlayerData {
  playerName: string;
}
interface HostData {
  hostName: string;
}

interface PlayerDisconnectedData {
  playerName: string;
  playerId: string;
  isHostDisconnected: boolean;
  roomId: string;
}

const useMutipleModeSocketEvents = (
  dispatch: any,
  isHost: boolean,
  timerStart: () => void
) => {
  const socket = useSocket();
  useEffect(() => {
    if (!socket) return;

    const handlePlayerJoinedEvent = (data: PlayerData) => {
      dispatch(handlePlayerJoined(data));
    };

    const handlePlayerDisconnectedEvent = (player: PlayerDisconnectedData) => {
      dispatch(handlePlayerDisconnected(player));
    };

    const handleHostInfoEvent = (host: HostData) => {
      dispatch(handleHostInfo(host));
    };

    const handlePlayerReadyEvent = (data: PlayerData) => {
      dispatch(handlePlayerReady(data));
    };

    const handleGameStart = () => {
      timerStart();
      dispatch(timerStatus({ status: 'gameRunning' }));
    };

    socket.on('playerJoined', handlePlayerJoinedEvent);
    socket.on('hostInfo', handleHostInfoEvent);
    socket.on('playerDisconnected', handlePlayerDisconnectedEvent);
    socket.on('opponentReady', handlePlayerReadyEvent);
    socket.on('hostStartTheGame', handleGameStart);

    return () => {
      socket.off('playerJoined', handlePlayerJoinedEvent);
      socket.off('hostInfo', handleHostInfoEvent);
      socket.off('playerDisconnected', handlePlayerDisconnectedEvent);
      socket.off('playerReady', handlePlayerReadyEvent);
      socket.off('gameStart', handleGameStart);
    };
  }, [socket, dispatch, isHost]);
};

export default useMutipleModeSocketEvents;

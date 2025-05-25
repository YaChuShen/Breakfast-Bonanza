import {
  handlePlayerJoined,
  handlePlayerDisconnected,
  handleHostInfo,
} from 'store/features/socketSlice';
import { useEffect } from 'react';
import { SocketMessage } from 'lib/type/socketMessage';

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
  socketMethods: SocketMessage,
  dispatch: any,
  isHost: boolean
) => {
  useEffect(() => {
    if (!socketMethods?.socket) return;

    const handlePlayerJoinedEvent = (data: PlayerData) => {
      dispatch(handlePlayerJoined(data));
    };

    const handlePlayerDisconnectedEvent = (player: PlayerDisconnectedData) => {
      dispatch(handlePlayerDisconnected(player));
    };

    const handleHostInfoEvent = (host: HostData) => {
      dispatch(handleHostInfo(host));
    };

    socketMethods.socket.on('playerJoined', handlePlayerJoinedEvent);
    socketMethods.socket.on('hostInfo', handleHostInfoEvent);
    socketMethods.socket.on(
      'playerDisconnected',
      handlePlayerDisconnectedEvent
    );

    return () => {
      socketMethods.socket.off('playerJoined', handlePlayerJoinedEvent);
      socketMethods.socket.off('hostInfo', handleHostInfoEvent);
      socketMethods.socket.off(
        'playerDisconnected',
        handlePlayerDisconnectedEvent
      );
    };
  }, [socketMethods, dispatch, isHost]);
};

export default useMutipleModeSocketEvents;

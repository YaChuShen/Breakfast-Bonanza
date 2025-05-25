import { SocketMessage } from 'lib/type/socketMessage';

export interface HandleMutipleModeProps {
  socketMethods: SocketMessage;
  setRoomId: (roomId: string) => void;
  setIsHost: (isHost: boolean) => void;
}

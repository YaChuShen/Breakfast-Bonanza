'use client';
import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
} from 'react';
import { io, Socket } from 'socket.io-client';
import { ReactNode } from 'react';
import { connectSocket } from 'lib/socket';
import { useSession } from 'next-auth/react';

const SocketContext = createContext<Socket | null>(null);

export const SocketIoProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const initSocket = async () => {
      if (!session) return;

      try {
        const socket = await connectSocket(session);
        setSocket(socket);

        // Cleanup function
        return () => {
          if (socket) {
            socket.disconnect();
            setSocket(null);
          }
        };
      } catch (error) {
        console.error('Failed to initialize socket:', error);
      }
    };

    initSocket();
  }, [session]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  const socket = useContext(SocketContext);

  return socket;
};

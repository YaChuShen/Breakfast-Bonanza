'use client';
import React, { createContext, useContext, useRef, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { ReactNode } from 'react';
import { connectSocket } from 'lib/socket';
import { useSession } from 'next-auth/react';

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socketRef = useRef<Socket | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const initSocket = async () => {
      if (!session) return;

      try {
        const socket = await connectSocket(session);
        socketRef.current = socket;

        // Cleanup function
        return () => {
          if (socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
          }
        };
      } catch (error) {
        console.error('Failed to initialize socket:', error);
      }
    };

    initSocket();
  }, [session]);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return socket;
};

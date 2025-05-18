import { io } from 'socket.io-client';
import { getSession } from 'next-auth/react';


export const connectSocket = async () => {
    const session = await getSession();
  
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      auth: {
        token: session?.accessToken,
      },
    });
  
    socket.on('connect', () => {
      console.log('🔌 Socket connected:', socket.id);
    });
  
    socket.on('disconnect', () => {
      console.log('❌ Socket disconnected');
    });
  
    return socket;
  };
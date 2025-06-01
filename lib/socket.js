import { io } from 'socket.io-client';

export const connectSocket = async (session) => {
  const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL_LOCAL, {
    auth: {
      token: session?.sub,
      name: session?.name,
      email: session?.email,
    },
  });

  console.log('🔌 Socket connected:', socket.id);

  socket.on('connect', () => {
    console.log('🔌 Socket connected:', socket.id);
  });

  socket.on('disconnect', () => {
    console.log('❌ Socket disconnected');
  });

  return socket;
};

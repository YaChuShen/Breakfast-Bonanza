'use client';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { Session } from 'next-auth';

interface SessionProvidersProps {
  children: ReactNode;
  session?: Session | null;
}

export function SessionProviders({ children, session }: SessionProvidersProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

'use client';
import { Provider } from 'react-redux';
import store from 'store/index';
import { ReactNode } from 'react';

interface ReduxProvidersProps {
  children: ReactNode;
}

export function ReduxProviders({ children }: ReduxProvidersProps) {
  return <Provider store={store}>{children}</Provider>;
}

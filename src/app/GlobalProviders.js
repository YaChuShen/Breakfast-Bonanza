'use client';
import { Global } from '@emotion/react';

export function Globals() {
  return (
    <Global
      styles={{
        body: {
          background: '#F2DBC2',
          overflow: 'hidden',
          margin: 0,
          padding: 0,
        },
      }}
    />
  );
}

import { Global } from '@emotion/react';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'contents/theme';
import { Provider } from 'react-redux';
import { store } from './store';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
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
        </ChakraProvider>
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;

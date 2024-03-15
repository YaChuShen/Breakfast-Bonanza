import { ChakraProviders } from './chakraProviders';
import { ReduxProviders } from './reduxProviders';
import { SessionProviders } from './sessionProviders';
import { Globals } from './GlobalProviders';

export default function RootLayout({ children }) {
  return (
    <ReduxProviders>
      <SessionProviders>
        <ChakraProviders>
          {children}
          <Globals />
        </ChakraProviders>
      </SessionProviders>
    </ReduxProviders>
  );
}

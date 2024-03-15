import { ChakraProviders } from './chakraProviders';
import { ReduxProviders } from './reduxProviders';
import { SessionProviders } from './sessionProviders';
import { Globals } from './GlobalProviders';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>
          <ReduxProviders>
            <SessionProviders>
              <ChakraProviders>
                {children}
                <Globals />
              </ChakraProviders>
            </SessionProviders>
          </ReduxProviders>
        </main>
      </body>
    </html>
  );
}

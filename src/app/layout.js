import { ChakraProviders } from './chakraProviders';
import { ReduxProviders } from './reduxProviders';
import { SessionProviders } from './sessionProviders';
import { Globals } from './GlobalProviders';
import MixpanelProvider from './mixpanel-provider';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>
          <ReduxProviders>
            <SessionProviders>
              <MixpanelProvider>
                <ChakraProviders>
                  {children}
                  <Globals />
                </ChakraProviders>
              </MixpanelProvider>
            </SessionProviders>
          </ReduxProviders>
        </main>
      </body>
    </html>
  );
}

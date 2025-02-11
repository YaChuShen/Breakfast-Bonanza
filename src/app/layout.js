import { ReduxProviders } from './reduxProviders';
import { SessionProviders } from './sessionProviders';
import { Globals } from './GlobalProviders';
import MixpanelProvider from './mixpanel-provider';
import ChakraUiProvider from './chakraUiProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>
          <ReduxProviders>
            <SessionProviders>
              <MixpanelProvider>
                <ChakraUiProvider>
                  {children}
                  <Globals />
                </ChakraUiProvider>
              </MixpanelProvider>
            </SessionProviders>
          </ReduxProviders>
        </main>
      </body>
    </html>
  );
}

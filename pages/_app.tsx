import index from "./index";
import { Global } from "@emotion/react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component />
      <Global
        styles={{
          body: {
            background: "#F2DBC2",
            overflow: "hidden",
            margin: 0,
            padding: 0,
          },
        }}
      />
    </SessionProvider>
  );
}

export default MyApp;

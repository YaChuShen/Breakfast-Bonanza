import index from "./index";
import { Global } from "@emotion/react";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, router, pageProps: { session, ...pageProps } }) {
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

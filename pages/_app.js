import index from "./index";
import { Global } from "@emotion/react";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        {/* <Component /> */}
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
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;

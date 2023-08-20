import index from "./index";
import { Global } from "@emotion/react";

function MyApp({ Component, router }) {
  return (
    <>
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
    </>
  );
}

export default MyApp;

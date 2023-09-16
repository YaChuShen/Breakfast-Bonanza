import React from "react";
import Media from "./Media";
import { Image, Text } from "@chakra-ui/react";

const Gress1 = () => {
  return (
    <Media greaterThanOrEqual='xl'>
      <Image
        src='/gress2.svg'
        w='18em'
        pos='absolute'
        left='-7em'
        bottom='-3em'
        zIndex={1}
      />
    </Media>
  );
};

export default Gress1;

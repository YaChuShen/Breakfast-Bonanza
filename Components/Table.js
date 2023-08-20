import { Center, Image } from "@chakra-ui/react";
import React from "react";

const Table = () => {
  return (
    <Center userSelect='none' pointerEvents='none'>
      <Image
        src='/table.svg'
        w='100em'
        minW='100em'
        bottom={{ md: "1em", xl: "-1em" }}
        pos='relative'
      />
    </Center>
  );
};

export default Table;

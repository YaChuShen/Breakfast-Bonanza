import { Center, Image } from "@chakra-ui/react";
import React from "react";
import { table } from "../helpers/rwd";

const Table = () => {
  return (
    <Center userSelect='none' pointerEvents='none'>
      <Image
        src='/table.svg'
        w='100em'
        minW='100em'
        bottom={table}
        pos='relative'
      />
    </Center>
  );
};

export default Table;

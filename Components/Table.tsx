import { Box, Center, Image } from '@chakra-ui/react';
import React from 'react';
import PlateSection from 'Components/PlateSection';
import Kitchen from './Kitchen';
import LittleTree from './LittleTree';

type TableProps = {
  isLevel2: boolean;
};

const Table = ({ isLevel2 }: TableProps) => {
  return (
    <Center>
      <Box
        userSelect="none"
        pos="relative"
        bottom="-1em"
        w="100em"
        minW="100em"
        draggable="false"
      >
        <LittleTree />
        <Kitchen isLevel2={isLevel2} />
        <PlateSection />
        <Image alt="table" src="/table.svg" />
      </Box>
    </Center>
  );
};

export default Table;

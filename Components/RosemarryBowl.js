import { Box, Image } from '@chakra-ui/react';
import React from 'react';

const RosemarryBowl = () => {
  return (
    <Box position="absolute" top={{ base: '1em', lg: '-1em' }} right="5em">
      <Image
        src="./rosemaryBowl.svg"
        w="5.5em"
        alt="rosemarryBowl"
        pointerEvents="none"
      />
      <Image
        src="./rosemary.svg"
        w="3em"
        alt="rosemarryBowl"
        position="absolute"
        top="0em"
        right="1em"
        cursor="pointer"
      />
    </Box>
  );
};

export default RosemarryBowl;

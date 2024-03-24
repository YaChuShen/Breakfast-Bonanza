import React from 'react';
import Media from './Media';
import { Image, Text } from '@chakra-ui/react';
import { BigTree } from 'helpers/rwd';

const Gress1 = () => {
  return (
    <Media greaterThanOrEqual="xl">
      <Image
        src="/gress2.svg"
        w="18em"
        alt=""
        pos="absolute"
        left="-7em"
        bottom={BigTree}
        zIndex={1}
      />
    </Media>
  );
};

export default Gress1;

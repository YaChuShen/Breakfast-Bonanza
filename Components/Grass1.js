import React from 'react';
import Media from './Media';
import { Image } from '@chakra-ui/react';
import { BigTree } from 'helpers/rwd';

const Grass1 = () => {
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

export default Grass1;

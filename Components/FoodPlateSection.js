import { Box, HStack, Image } from '@chakra-ui/react';
import React from 'react';
import FoodTemplate from './FoodTemplate';

const FoodPlateSection = ({ level2 }) => {
  return (
    <HStack pos="relative" spacing={1}>
      <Box
        pos="absolute"
        w="10em"
        left={-5}
        bottom={level2 ? -14 : -9}
        pointerEvents="none"
      >
        <Image src="/foodPlate.svg" alt="" />
      </Box>
      <FoodTemplate
        value={'egg'}
        src={'egg'}
        w="3em"
        zIndex={1}
        className=".first-step"
      />
      <FoodTemplate value="hotDog0" src="hotDog0" w="4.5em" zIndex={1} />
      {level2 && (
        <FoodTemplate
          value="bacon0"
          src="bacon0"
          w="4.5em"
          zIndex={1}
          pos="absolute"
          left={4}
          bottom={-9}
        />
      )}
    </HStack>
  );
};

export default FoodPlateSection;

import { Box, HStack } from '@chakra-ui/react';
import React from 'react';
import CookTemplate from 'Components/CookTemplate';
import smartSize from 'helpers/smartSize';
import FoodPlateSection from 'Components/FoodPlateSection';
import FoodTemplate from 'Components/FoodTemplate';

const MaterialSection = ({ level2 }) => {
  return (
    <HStack spacing={0} className="first-step">
      <CookTemplate
        tool={'pan'}
        w={smartSize('9em', '11em', level2)}
        zIndex={1}
        isLevel2={level2}
      />
      {level2 && (
        <CookTemplate
          tool={'pan'}
          w={smartSize('9em', '11em', level2)}
          zIndex={1}
          isLevel2={level2}
        />
      )}
      <FoodPlateSection level2={level2} />
      <Box pl="4">
        <FoodTemplate value={'coffee'} src={'coffee'} />
      </Box>
    </HStack>
  );
};

export default MaterialSection;

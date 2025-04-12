import { HStack, Stack } from '@chakra-ui/react';
import React from 'react';
import smartSize from 'helpers/smartSize';
import Toaster from 'Components/Toaster';
import Jam from 'Components/Jam';
import FoodTemplate from 'Components/FoodTemplate';
import { IsLevel2Props } from 'lib/type/isLevel2';


const ToasterSection = ({ isLevel2 }: IsLevel2Props) => {
  return (
    <Stack
      spacing={0}
      direction={{ base: isLevel2 ? 'column' : 'row', lg: 'row' }}
      alignItems="center"
    >
      <HStack>
        <Toaster w={smartSize({ base: '5em', lg: '7em', isLevel2 })} />
        {isLevel2 && (
          <Toaster w={smartSize({ base: '5em', lg: '7em', isLevel2 })}  />
        )}
      </HStack>
      <Stack direction={{ base: isLevel2 ? 'row' : 'column', lg: 'column' }}>
        <Jam />
        <FoodTemplate
          value={'toast0'}
          src={'toast0'}
          w={{ base: '4.5em', lg: '5.5em' }}
        />
      </Stack>
    </Stack>
  );
};

export default ToasterSection;

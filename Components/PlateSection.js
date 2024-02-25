import { HStack } from '@chakra-ui/react';
import React from 'react';
import Plate from './Plate';
import { range } from 'lodash';
import { plate } from '../helpers/rwd';
import { selectPlate } from 'store/features/plateSlice';
import { useSelector } from 'react-redux';

const PlateSection = ({ data, methods }) => {
  const plateData = useSelector(selectPlate);

  return (
    <HStack
      spacing={10}
      w="100%"
      justifyContent="center"
      pos="absolute"
      bottom={plate}
    >
      {range(data?.plate).map((e, i) => (
        <Plate data={plateData} setValue={methods.setValue} index={e} key={i} />
      ))}
    </HStack>
  );
};

export default PlateSection;

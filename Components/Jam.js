import { Box, HStack, Image } from '@chakra-ui/react';
import React from 'react';
import autoJamSystem from '../helpers/autoJamSystem';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectPlate } from 'store/features/plateSlice';

const jamArr = [
  { init: 'blueberry-can', done: 'blueberry' },
  { init: 'butter-can', done: 'butter' },
];

const Jam = () => {
  const plateData = useSelector(selectPlate);
  const dispatch = useDispatch();

  return (
    <HStack userSelect="none">
      {jamArr.map((e, i) => (
        <Box
          key={i}
          px="0"
          cursor="pointer"
          onClick={() => {
            autoJamSystem(plateData, e.done, dispatch);
          }}
        >
          <Image
            src={`/${e.init}.svg`}
            w="3.5em"
            pointerEvents="none"
            alt="jam"
          />
        </Box>
      ))}
    </HStack>
  );
};

export default Jam;

import { Box, HStack, Image } from '@chakra-ui/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import autoJamSystem from '../helpers/autoJamSystem';
import { useDispatch } from 'react-redux';

// type JamObj = {
//   done: string,
//   init: string,
// };

const jamArr = [
  { init: 'blueberry-can', done: 'blueberry' },
  { init: 'butter-can', done: 'butter' },
];

const Jam = () => {
  const { setValue, watch } = useFormContext();
  const data = watch();
  const dispatch = useDispatch();

  return (
    <HStack userSelect="none">
      {jamArr.map((e, i) => (
        <Box
          key={i}
          px="0"
          cursor="pointer"
          onClick={() => {
            autoJamSystem(data, e.done, setValue, dispatch);
          }}
        >
          <Image src={`/${e.init}.svg`} w="4em" pointerEvents="none" />
        </Box>
      ))}
    </HStack>
  );
};

export default Jam;

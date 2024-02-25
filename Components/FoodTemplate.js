import { Center, Image } from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setTargetItem } from 'store/features/plateSlice';

const size = {
  coffee: '3.5em',
  toast: '8em',
  'blueberry-toast': '8em',
};

const FoodTemplate = ({ value, src, w = '5em', ...props }) => {
  const dispatch = useDispatch();

  return (
    <Center
      {...props}
      draggable="true"
      cursor="grab"
      onDragStart={() => {
        dispatch(setTargetItem({ target: value }));
      }}
    >
      <Image src={`/${src}.svg`} w={size[value] ?? w} maxW="8em"></Image>
    </Center>
  );
};

export default FoodTemplate;

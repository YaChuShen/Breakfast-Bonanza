import { Center, Image } from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setTargetItem } from 'store/features/plateSlice';
import { ResponsiveValue } from '@chakra-ui/react';

const size: Record<string, string> = {
  coffee: '2.5em',
  toast: '6.5em',
  'blueberry-toast': '6.5em',
};

type FoodTemplateProps = {
  value?: string;
  src: string;
  w?: ResponsiveValue<string>;
  className?: string;
  zIndex?: number;
  pos?: 'absolute' | 'relative' | 'fixed' | 'sticky' | 'static';
  left?: number | string;
  bottom?: number;
  top?: number;
};


const FoodTemplate = ({ value, src, w = '5em', className, ...props }: FoodTemplateProps) => {
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
      <Image
        src={`/${src}.svg`}
        alt=""
        w={value ? size[value] ?? w : w}
        maxW="8em"
        className={className}
      />
    </Center>
  );
};

export default FoodTemplate;

import { Box, Center, HStack, Image } from '@chakra-ui/react';
import React from 'react';
import FoodTemplate from './FoodTemplate';
import { plateToDropFood } from 'contents/rulse';
import materialList from 'contents/materialList';
import { useDispatch } from 'react-redux';
import {
  addFood,
  setTargetItem,
  setTargetPlate,
} from '../pages/features/plateSlice';

const foodPosition = {
  sunnyEgg: '0',
  hotDog: '3em',
};

const foodIndex = {
  sunnyEgg: 0,
  hotDog: 1,
};

const list1 = {
  sunnyEgg: { bottom: 5, index: 2, left: 6 },
  hotDog: { bottom: 5, index: 2, left: 6 },
  toast: { bottom: 0, index: 1, left: 2 },
  blueberry: { bottom: 0, index: 1, left: 3 },
  butter: { bottom: 0, index: 1, left: 3 },
};

const ShadowTelplate = ({ bottom, left, w, rotate, blur }) => {
  return (
    <Box
      pos="absolute"
      bottom={bottom}
      left={left}
      borderRadius="30%"
      w={w}
      h="1.5em"
      bg="#D0D0D0"
      filter={`blur(${blur}px)`}
      transform={`rotate(${rotate}deg)`}
    />
  );
};

const shadow = {
  toast: <ShadowTelplate bottom={4} left={9} w="4em" rotate={-20} blur={3} />,
  hotDog: <ShadowTelplate bottom={4} left={9} w="4em" rotate={-20} blur={3} />,
};

const Plate = ({ data, setValue, index }) => {
  const dispatch = useDispatch();
  const key = `plateContent${index + 1}`;
  const food = data[key];
  const { targetPlate, targetItem } = data;
  const isValide = food?.every((e) => plateToDropFood.includes(e));
  const toastFirst = food?.[0] === 'toast';
  const jam = food?.[1] === 'blueberry' || food?.[1] === 'butter';

  const displayRules = (category) => {
    const isToast = category === 'toast';
    const okFood = category === 'sunnyEgg' || category === 'hotDog';

    if (toastFirst) {
      return list1[category];
    } else {
      if (isToast) return null;
      if (okFood)
        return {
          left: foodPosition[category],
          index: foodIndex[category],
          bottom: 3,
        };
    }
    return null;
  };
  const showUp = isValide && food.length > 0 && displayRules(food[0]);

  return (
    <Center
      pos="relative"
      draggable="true"
      onDrop={(e) => {
        //檢查可不可以丟進盤子裡，
        if (
          !targetPlate &&
          !targetItem?.includes('2') &&
          !materialList?.includes(targetItem)
        ) {
          dispatch(addFood({ id: index + 1, targetItem }));
          dispatch(setTargetItem({ target: null }));

          setValue(key, [...food, targetItem]);
          setValue('targetItem', null);
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDragStart={() => {
        setValue('targetItem', food.join('&'));
        setValue('targetPlate', index + 1);
        dispatch(setTargetItem({ target: food.join('&') }));
        dispatch(setTargetPlate({ index: index + 1 }));
      }}
      onDragEnd={(e) => {
        dispatch(setTargetPlate({ index: null }));
        setValue('targetPlate', null);
      }}
    >
      <Image src="plate.svg" w="8em" />
      {showUp && (
        <>
          <FoodTemplate
            value={food[0]}
            src={food[0]}
            pos="absolute"
            bottom={displayRules(food[0]).bottom}
            left={displayRules(food[0]).left}
            zIndex={displayRules(food[0]).index}
          />
          {/* /** displayRules(food[1]) => 吐司不能放第二層*/}
          {food.length > 1 && displayRules(food[1]) && (
            <FoodTemplate
              value={food[1]}
              src={food[1]}
              pos="absolute"
              bottom={displayRules(food[1]).bottom}
              left={displayRules(food[1]).left}
              zIndex={displayRules(food[1]).index}
              w={jam ? '10em' : '5em'}
            />
          )}
        </>
      )}
      {/* {isValide && shadow[food]} */}
    </Center>
  );
};

export default Plate;

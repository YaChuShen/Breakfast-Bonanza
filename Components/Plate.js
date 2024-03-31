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
} from 'store/features/plateSlice';

const foodList = {
  sunnyEgg: { left: '0', bottom: 2, index: 0 },
  hotDog: { left: '3em', bottom: 2, index: 1 },
  bacon: { left: '2', bottom: 7, index: 2 },
};

const toastFirstPosition = {
  sunnyEgg: { bottom: 5, index: 2, left: 6 },
  hotDog: { bottom: 5, index: 2, left: 6 },
  toast: { bottom: 0, index: 1, left: 2 },
  blueberry: { bottom: 0, index: 1, left: 3 },
  butter: { bottom: 0, index: 1, left: 3 },
  bacon: { bottom: 9, index: 3, left: 12 },
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

const Plate = ({ data, setValue, index, className }) => {
  const dispatch = useDispatch();
  const key = `plateContent${index + 1}`;
  const food = data[key];
  const { targetPlate, targetItem } = data;
  const isValide = food?.every((e) => plateToDropFood.includes(e));
  const toastFirst = food?.[0] === 'toast';
  const jam = food?.[1] === 'blueberry' || food?.[1] === 'butter';

  const displayRules = (category) => {
    const isToast = category === 'toast';
    //主要是控制css的位置擺放，分為吐司在下面與其他主食的位置
    if (toastFirst) {
      return toastFirstPosition[category];
    } else {
      if (isToast) return null;
      if (Object.keys(foodList).includes(category))
        return {
          left: foodList[category].left,
          index: foodList[category].index,
          bottom: foodList[category].bottom,
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
      <Image src="plate.svg" w="8em" className={className} />
      {showUp && (
        <>
          {food.map((item, i) => {
            const foodDisplayRule = displayRules(food[i]);
            const rules = i > 0 ? food.length > i && foodDisplayRule : true;
            return (
              rules && (
                <FoodTemplate
                  value={food[i]}
                  src={food[i]}
                  pos="absolute"
                  bottom={foodDisplayRule.bottom}
                  left={foodDisplayRule.left}
                  zIndex={foodDisplayRule.index}
                  w={jam ? '10em' : '5em'}
                  key={i}
                />
              )
            );
          })}
        </>
      )}
      {/* {isValide && shadow[food]} */}
    </Center>
  );
};

export default Plate;

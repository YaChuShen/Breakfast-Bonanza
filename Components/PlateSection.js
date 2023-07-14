import { Box, Center, HStack, Image } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import FoodTemplate from "./FoodTemplate";

const validFood = [
  "sunnyEgg",
  "hotDog",
  "toast",
  "blueberry-toast",
  "butter-toast",
];

const foodPosition = {
  sunnyEgg: "0",
  hotDog: "3em",
};

const foodIndex = {
  sunnyEgg: 0,
  hotDog: 1,
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

const PlateSection = ({ data, setValue, index }) => {
  const key = `plateContent${index + 1}`;
  const food = data[key];
  const isValide = food?.every((e) => validFood.includes(e));
  const toastFirst = food?.[0] === "toast";
  const jam = food?.[1] === "blueberry-toast" || food?.[1] === "butter-toast";

  const foodRules = (category) => {
    const isToast =
      category === "toast" ||
      category === "blueberry-toast" ||
      category === "butter-toast";

    const okFood = category === "sunnyEgg" || category === "hotDog";

    if (toastFirst) {
      if (okFood) return { left: 6, index: 2 };
      if (isToast) return { left: 2, index: 1 };
    } else {
      if (isToast) return null;
      if (okFood) {
        return { left: foodPosition[category], index: foodIndex[category] };
      }
    }
    return null;
  };

  const showUp = isValide && food.length > 0 && foodRules(food[0]);

  return (
    <Center
      pos="relative"
      draggable="true"
      onDrop={(e) => {
        if (showUp) {
          setValue(key, [...food, data.targetItem]);
          setValue("targetItem", null);
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDragStart={() => {
        setValue("targetItem", food.join("&"));
        setValue("targetPlate", index + 1);
      }}
    >
      <Image src="plate.svg" w="8em" />
      {showUp && (
        <>
          {/* <FoodTemplate
            value={food[0]}
            src={food[0]}
            pos="absolute"
            bottom={toastFirst ? 0 : 3}
            left={foodRules(food[0]).left}
            zIndex={foodRules(food[0]).index}
          /> */}
          {food.length > 1 && foodRules(food[1]) && (
            <FoodTemplate
              value={food[1]}
              src={food[1]}
              pos="absolute"
              bottom={toastFirst ? (jam ? 1 : 5) : 3}
              left={foodRules(food[1]).left}
              zIndex={foodRules(food[1]).index}
            />
          )}
        </>
      )}
      {/* {isValide && shadow[food]} */}
    </Center>
  );
};

export default PlateSection;

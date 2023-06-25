import { Box, Center, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import FoodTemplate from "./FoodTemplate";

const validFood = ["sunnyEgg", "hotDog", "toast"];

const Plate = ({ data, setValue }) => {
  const food = data.plateContent;
  const isValide = validFood.includes(food);

  return (
    <Center
      pos='relative'
      draggable='true'
      onDragStart={() => {
        setValue("targetItem", food);
      }}>
      <Image src='plate.svg' w='8em' />
      {isValide && (
        <FoodTemplate
          value={food}
          src={food}
          pos='absolute'
          bottom={3}
          zIndex={1}
        />
      )}
      {isValide && (
        <Box
          pos='absolute'
          bottom={3}
          borderRadius='30%'
          w='5.5em'
          h='1em'
          bg='#DDDDDD'
          filter=' blur(3px)'
        />
      )}
    </Center>
  );
};

export default Plate;

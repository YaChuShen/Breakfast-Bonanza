import { Center, Image } from "@chakra-ui/react";
import React from "react";
import { useFormContext } from "react-hook-form";

const size = {
  coffee: "3.5em",
  toast: "8em",

  "blueberry-toast": "8em",
};

const FoodTemplate = ({ value, src, w = "5em", setCrackEggs, ...props }) => {
  const { setValue } = useFormContext();

  return (
    <Center
      {...props}
      draggable='true'
      cursor='grab'
      onDragStart={() => {
        setValue("targetItem", value);
      }}>
      <Image src={`/${src}.svg`} w={size[value] ?? w} maxW='8em'></Image>
    </Center>
  );
};

export default FoodTemplate;

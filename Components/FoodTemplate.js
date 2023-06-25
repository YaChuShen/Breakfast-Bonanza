import { Center, Image } from "@chakra-ui/react";
import React from "react";
import { useFormContext } from "react-hook-form";

const FoodTemplate = ({ value, src, w = "5em", setCrackEggs, ...props }) => {
  const { setValue } = useFormContext();
  const isCoffee = value === "coffee";
  return (
    <Center
      {...props}
      draggable='true'
      cursor='grab'
      w={isCoffee ? "3.5em" : w}
      onDragStart={() => {
        console.log("start");
        setValue("targetItem", value);
      }}>
      <Image src={`/${src}.svg`}></Image>
    </Center>
  );
};

export default FoodTemplate;

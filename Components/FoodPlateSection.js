import { Box, HStack, Image } from "@chakra-ui/react";
import React from "react";
import FoodTemplate from "./FoodTemplate";

const FoodPlateSection = () => {
  return (
    <HStack pos='relative' spacing={1}>
      <Box pos='absolute' w='10em' left={-5} bottom={-10}>
        <Image src='/foodPlate.svg' alt='' />
      </Box>
      <FoodTemplate value={"egg"} src={"egg"} w='3em' zIndex={1} />
      <FoodTemplate value={"hotDog0"} src={"hotDog0"} w='4.5em' zIndex={1} />
    </HStack>
  );
};

export default FoodPlateSection;

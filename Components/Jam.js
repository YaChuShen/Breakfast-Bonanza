import { Box, HStack, Image } from "@chakra-ui/react";
import React from "react";
import { useFormContext } from "react-hook-form";
import autoJamSystem from "/helpers/autoJamSystem";

const jamArr = [
  { init: "blueberry-can", done: "blueberry-toast" },
  { init: "butter-can", done: "butter-toast" },
];

const Jam = () => {
  const { setValue, watch } = useFormContext();
  const data = watch();
  return (
    <HStack>
      {jamArr.map((e, i) => (
        <Box
          key={i}
          px="2"
          cursor="pointer"
          onClick={() => {
            autoJamSystem(data, e.done, setValue);
          }}
        >
          <Image src={`/${e.init}.svg`} w="5em"></Image>
        </Box>
      ))}
    </HStack>
  );
};

export default Jam;

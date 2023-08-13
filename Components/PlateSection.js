import { HStack } from "@chakra-ui/react";
import React from "react";
import Plate from "./Plate";
import { range } from "lodash";

const PlateSection = ({ data, methods }) => {
  return (
    <HStack
      spacing={10}
      w='100%'
      justifyContent='center'
      pos='absolute'
      bottom={{ base: "22em", xl: "20em" }}>
      {range(data.plate).map((e, i) => (
        <Plate data={data} setValue={methods.setValue} index={e} key={i} />
      ))}
    </HStack>
  );
};

export default PlateSection;

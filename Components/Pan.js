import { Box, Center, Image } from "@chakra-ui/react";
import React, { useState, Component, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import SVG from "./Svg";
import FoodTemplate from "./FoodTemplate";

const Pan = () => {
  const { setValue, watch } = useFormContext();
  const data = watch();
  const [crackEggs, setCrackEggs] = useState(false);
  const [maturity, setMaturity] = useState(false);

  useEffect(() => {
    if (crackEggs) {
      const s = setTimeout(() => {
        setMaturity(true);
      }, [5000]);
      return () => clearTimeout(s);
    }
  }, [crackEggs]);

  console.log(maturity);

  return (
    <Box
      border='1px solid red'
      onDrop={(e) => {
        if (data.targetItem === "egg") {
          setCrackEggs(true);
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}>
      <Box pos='relative'>
        <Image src='pan.svg' w='8em' pointerEvents={"none"} userSelect='none' />
        {crackEggs && (
          <Center draggable='true' pos='absolute' top={7} left={5}>
            {maturity ? (
              <Center
                draggable='true'
                cursor='grab'
                borderRadius='50%'
                w='5em'
                onDragStart={() => {
                  setValue("targetItem", "sunnyEgg");
                }}
                onDragEnd={() => {
                  setCrackEggs(false);
                  setMaturity(false);
                }}>
                <Image src={`/sunnyEgg.svg`}></Image>
              </Center>
            ) : (
              <Image src='/sunnyEgg0.svg' w='5em' />
            )}
          </Center>
        )}
      </Box>
    </Box>
  );
};

export default Pan;

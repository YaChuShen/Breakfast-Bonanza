import { Box, Center, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import cookedList from "../contents/cookedList";

const CookTemplate = ({ tool }) => {
  const { setValue, watch } = useFormContext();
  const data = watch();
  const [cooking, setcooking] = useState(false);
  const [cookedGroup, setCookedGroup] = useState();
  const [maturity, setMaturity] = useState(false);

  useEffect(() => {
    if (cooking) {
      const s = setTimeout(() => {
        setMaturity(true);
      }, [5000]);
      return () => clearTimeout(s);
    }
  }, [cooking]);

  return (
    <Box
      w='8em'
      onDragEnter={() => {
        if (!cooking) {
          setCookedGroup(
            cookedList.find((e) => e.init.value === data.targetItem)
          );
        }
      }}
      onDrop={(e) => {
        if (data.targetItem === cookedGroup?.init.value) {
          setcooking(true);
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}>
      <Box pos='relative'>
        <Image
          src={`/${tool}.svg`}
          w='8em'
          pointerEvents={"none"}
          userSelect='none'
        />
        {cooking && (
          <Center draggable='true' pos='absolute' top={7} left={5}>
            {maturity ? (
              <Center
                draggable='true'
                cursor='grab'
                borderRadius='50%'
                w='5em'
                onDragStart={() => {
                  setValue("targetItem", cookedGroup?.done.value);
                }}
                onDragEnd={() => {
                  setcooking(false);
                  setMaturity(false);
                }}>
                <Image src={`/${cookedGroup?.done.src}.svg`}></Image>
              </Center>
            ) : (
              <Image src={`/${cookedGroup?.init.src}.svg`} w='5em' />
            )}
          </Center>
        )}
      </Box>
    </Box>
  );
};

export default CookTemplate;

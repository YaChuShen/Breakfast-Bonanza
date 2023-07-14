import { Box, Center, Circle, Image, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import stoveList from "../contents/cookedList";
import autoPlateSystem from "../helpers/autoPlateSystem";
import Progress from "./Progress";

const CookTemplate = ({ tool, w = "14em" }) => {
  const { setValue, watch } = useFormContext();
  const data = watch();
  const [cooking, setcooking] = useState(false);
  const [maturity, setMaturity] = useState(false);
  const [cookedGroup, setCookedGroup] = useState();

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
      onDragEnter={() => {
        //確認是不是正確的食物進來 ex:蛋或是熱狗，並且記錄是哪個食物group，方便drop時做食物正確性的判斷
        if (!cooking) {
          setCookedGroup(
            stoveList.find((e) => e.init.value === data.targetItem)
          );
        }
      }}
      onDrop={(e) => {
        //是不是食物原物料進來
        if (data.targetItem === cookedGroup?.init.value) {
          setcooking(true);
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Box pos="relative">
        <Image
          src={`/${tool}.svg`}
          pointerEvents={"none"}
          userSelect="none"
          w={w}
        />
        {(cooking || maturity) && (
          <Progress time={250} pos="absolute" size="30px" top={5} left={0} />
        )}
        {cooking && (
          <Center draggable="true" pos="absolute" top={7} left={"4.3em"}>
            {maturity ? (
              <Center
                draggable="true"
                onClick={() => {
                  autoPlateSystem(
                    data,
                    cookedGroup?.done.value,
                    maturity,
                    setValue
                  );
                  setcooking(false);
                  setMaturity(false);
                }}
                onDragStart={() => {
                  setValue("targetItem", cookedGroup?.done.value);
                }}
                onDragEnd={() => {
                  if (data.targetItem === null) {
                    setcooking(false);
                    setMaturity(false);
                  }
                }}
                cursor="grab"
                borderRadius="50%"
                w="5em"
              >
                <Image src={`/${cookedGroup?.done.src}.svg`}></Image>
              </Center>
            ) : (
              <Image src={`/${cookedGroup?.init.src}.svg`} w="5em" />
            )}
          </Center>
        )}
      </Box>
    </Box>
  );
};

export default CookTemplate;

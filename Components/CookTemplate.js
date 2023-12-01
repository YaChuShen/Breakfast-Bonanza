import { Box, Center, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import stoveList from "../contents/cookedList";
import Progress from "./Progress";
import { MUTURITYTIME, OVERTIME } from "../contents/rulse";
import onDragEnter from "../helpers/cook/onDragEnter";
import onDrop from "../helpers/cook/onDrop";
import passToPlate from "../helpers/cook/passToPlate";

const statusList = {
  cooking: "init",
  maturity: "done",
  over: "over",
};

const CookTemplate = ({ tool, w = "14em", ...props }) => {
  const { setValue, watch } = useFormContext();
  const data = watch();
  const [cookedGroup, setCookedGroup] = useState();
  const [status, setStatus] = useState();
  const isCooking = status === "cooking";
  const isMaturity = status === "maturity";
  const isOver = status === "over";
  const key = statusList[status];

  useEffect(() => {
    if (isCooking) {
      const s = setTimeout(() => {
        setStatus("maturity");
      }, [MUTURITYTIME]);
      return () => clearTimeout(s);
    }
    if (isMaturity) {
      const s = setTimeout(() => {
        setStatus("over");
      }, [OVERTIME]);
      return () => clearTimeout(s);
    }
  }, [status]);

  const foodOnDragStart = () => {
    if (isMaturity || isOver) {
      setValue(
        "targetItem",
        isOver ? cookedGroup?.over.value : cookedGroup?.done.value
      );
    }
  };

  const foodOnDragEnd = () => {
    if (data.targetItem === null) {
      setStatus(null);
    }
  };

  return (
    <Box
      {...props}
      onDragEnter={() =>
        onDragEnter(data, status, isOver, stoveList, setCookedGroup)
      }
      onDrop={() => onDrop(data, cookedGroup, status, setStatus)}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}>
      <Box pos='relative' w={w}>
        <Image
          src={`/${tool}.svg`}
          pointerEvents={"none"}
          userSelect='none'
          w={w}
        />
        {(isCooking || isMaturity) && (
          <Progress
            time={MUTURITYTIME / 20}
            pos='absolute'
            size='30px'
            top={5}
            left={0}
          />
        )}
        {status && (
          <Center
            pos='absolute'
            top={7}
            left={"4.3em"}
            userSelect='none'
            pointerEvents={isCooking && "none"}
            draggable='true'
            onClick={() =>
              passToPlate(data, cookedGroup, isMaturity, setValue, setStatus)
            }
            onDragStart={foodOnDragStart}
            onDragEnd={foodOnDragEnd}
            cursor='grab'
            borderRadius='50%'>
            <Image src={`/${cookedGroup?.[key].src}.svg`} w='4.5em' />
          </Center>
        )}
      </Box>
    </Box>
  );
};

export default CookTemplate;

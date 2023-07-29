import { Box, Center, Circle, Image, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import stoveList from "../contents/cookedList";
import autoPlateSystem from "../helpers/autoPlateSystem";
import Progress from "./Progress";
import { MUTURITYTIME, OVERTIME } from "../contents/rulse";

const statusList = {
  cooking: "init",
  maturity: "done",
  over: "over",
};

const CookTemplate = ({ tool, w = "14em" }) => {
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

  const onDragEnter = () => {
    //確認是不是正確的食物進來 ex:蛋或是熱狗，並且記錄是哪個食物group，並且render正確的圖片，方便drop時做食物正確性的判斷
    if (!status) {
      setCookedGroup(stoveList.find((e) => e.init.value === data.targetItem));
    }
  };

  const onDrop = () => {
    //是不是食物原物料進來
    if (data.targetItem === cookedGroup?.init.value) {
      setStatus("cooking");
    }
  };

  const passToPlate = () => {
    if (isMaturity) {
      autoPlateSystem(data, cookedGroup?.done.value, isMaturity, setValue);
      setStatus(null);
    }
  };

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
      onDragEnter={onDragEnter}
      onDrop={onDrop}
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
            onClick={passToPlate}
            onDragStart={foodOnDragStart}
            onDragEnd={foodOnDragEnd}
            cursor='grab'
            borderRadius='50%'>
            <Image src={`/${cookedGroup?.[key].src}.svg`} w='5em' />
          </Center>
        )}
      </Box>
    </Box>
  );
};

export default CookTemplate;

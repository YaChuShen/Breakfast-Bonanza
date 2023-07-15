import { Box, Center, CircularProgress, HStack, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { tosterList } from "../contents/cookedList";
import autoPlateSystem from "../helpers/autoPlateSystem";
import Progress from "./Progress";
import FoodTemplate from "./FoodTemplate";

const statusList = {
  cooking: "toasterIn0",
  maturity: "toasterIn1",
  over: "toasterIn2",
  done: "toaster1",
  overDone: "toaster2",
};

const Toster = ({ tool, w = "14em" }) => {
  const { setValue, watch } = useFormContext();
  const data = watch();
  const [cookedGroup, setCookedGroup] = useState();
  const [status, setStatus] = useState();
  const isCooking = status === "cooking";
  const isMaturity = status === "maturity";
  const isDone = status === "done";
  const isOver = status === "over";
  const [move, setMove] = useState();
  //如果是吐司原料並且不是正在烤與已經烤好的狀態，才可以放新的吐司進去
  const canPutIn =
    data.targetItem === cookedGroup?.init.value && !isMaturity && !isDone;

  useEffect(() => {
    if (isCooking) {
      const s = setTimeout(() => {
        setStatus("maturity");
      }, [5000]);
      return () => clearTimeout(s);
    }
    if (isMaturity) {
      const s = setTimeout(() => {
        setStatus("over");
      }, [5000]);
      return () => clearTimeout(s);
    }
  }, [status]);

  const onDragEnter = () => {
    if (!isCooking) {
      setCookedGroup(tosterList.find((e) => e.init.value === data.targetItem));
    }
  };

  const onDrop = () => {
    if (canPutIn) {
      setStatus("cooking");
    }
  };

  const passToPlate = () => {
    autoPlateSystem(data, cookedGroup?.done.value, isDone, setValue);
    if (isDone) {
      setStatus(null);
      setMove(false);
    }
  };

  const turnOn = () => {
    if (isMaturity) {
      setStatus("done");
    } else if (isOver) {
      setStatus("overDone");
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
      <Box pos='relative' cursor={isDone && "pointer"}>
        {(isCooking || isMaturity) && (
          <Progress time={250} pos='absolute' size='30px' top={5} left={5} />
        )}

        <Box
          visibility={move ? "visible" : "hidden"}
          draggable='true'
          onDragEnd={() => {
            if (data.targetItem === null) {
              setMove(false);
            }
          }}
          onDragStart={() => {
            setValue("targetItem", cookedGroup?.done.value);
          }}>
          <FoodTemplate
            src={"toast"}
            pos='absolute'
            top={-2}
            left={10}
            w='8em'
          />
        </Box>
        {status ? (
          <Box
            pos='relative'
            onMouseDown={(e) => {
              if (isMaturity) {
                setMove(true);
                setStatus(null);
              }
            }}>
            <Image
              src={`/${statusList[status]}.svg`}
              pointerEvents='none'
              cursor={isDone && "pointer"}
              userSelect='none'
              w={w}
              onClick={passToPlate}
            />
          </Box>
        ) : (
          <Image
            src={`/toaster.svg`}
            pointerEvents={"none"}
            userSelect='none'
            w={w}
          />
        )}

        <Box
          onClick={turnOn}
          w='3em'
          h='3em'
          cursor='pointer'
          pos='absolute'
          bottom={"3em"}
          right={2}
        />
      </Box>
    </Box>
  );
};

export default Toster;

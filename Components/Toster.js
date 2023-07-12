import { Box, Center, CircularProgress, HStack, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { tosterList } from "../contents/cookedList";
import autoPlateSystem from "../helpers/autoPlateSystem";
import Progress from "./Progress";

const statusList = {
  cooking: "toasterIn0",
  maturity: "toasterIn1",
  done: "toaster1",
};

const Toster = ({ tool, w = "14em" }) => {
  const { setValue, watch } = useFormContext();
  const data = watch();
  const [cookedGroup, setCookedGroup] = useState();
  const [status, setStatus] = useState();
  const isCooking = status === "cooking";
  const isMaturity = status === "maturity";
  const isDone = status === "done";

  useEffect(() => {
    if (isCooking) {
      const s = setTimeout(() => {
        setStatus("maturity");
      }, [5000]);
      return () => clearTimeout(s);
    }
  }, [status]);

  return (
    <Box
      onDragEnter={() => {
        if (!isCooking) {
          setCookedGroup(
            tosterList.find((e) => e.init.value === data.targetItem)
          );
        }
      }}
      onDrop={(e) => {
        //如果是吐司素材並且不是正在烤與已經烤好的狀態，才可以放新的吐司進去
        if (
          data.targetItem === cookedGroup?.init.value &&
          !isMaturity &&
          !isDone
        ) {
          setStatus("cooking");
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Box
        pos="relative"
        cursor={isDone && "pointer"}
        onClick={() => {
          autoPlateSystem(data, cookedGroup?.done.value, isDone, setValue);
          if (isDone) {
            setStatus(null);
          }
        }}
      >
        {(isCooking || isMaturity) && (
          <Progress time={250} pos="absolute" size="30px" top={5} left={5} />
        )}

        {status ? (
          <Image
            src={`/${statusList[status]}.svg`}
            pointerEvents="none"
            cursor={isDone && "pointer"}
            userSelect="none"
            w={w}
          />
        ) : (
          <Image
            src={`/toaster.svg`}
            pointerEvents={"none"}
            userSelect="none"
            w={w}
          />
        )}

        <Box
          onClick={() => {
            if (isMaturity) {
              setStatus("done");
            }
          }}
          w="3em"
          h="3em"
          cursor="pointer"
          pos="absolute"
          bottom={"3em"}
          right={2}
        />
      </Box>
    </Box>
  );
};

export default Toster;

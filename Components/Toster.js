import { Box, Center, HStack, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { tosterList } from "../contents/cookedList";

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
  const isDone = status === "done";

  useEffect(() => {
    if (status === "cooking") {
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
        if (data.targetItem === cookedGroup?.init.value) {
          setStatus("cooking");
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}>
      <Box pos='relative'>
        {status ? (
          <Image
            src={`/${statusList[status]}.svg`}
            pointerEvents={!isDone && "none"}
            cursor={isDone && "pointer"}
            userSelect='none'
            w={w}
            onClick={() => {
              if (isDone) {
                setValue("plateContent", "toast");
                setStatus(null);
              }
            }}
          />
        ) : (
          <Image
            src={`/toaster.svg`}
            pointerEvents={"none"}
            userSelect='none'
            w={w}
          />
        )}

        <Box
          onClick={() => {
            setStatus("done");
          }}
          w='3em'
          h='3em'
          cursor='pointer'
          pos='absolute'
          bottom={"3em"}
          right={2}></Box>
      </Box>
    </Box>
  );
};

export default Toster;

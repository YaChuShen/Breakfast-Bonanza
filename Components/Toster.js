import { Box, Center, HStack, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { tosterList } from "../contents/cookedList";
import settingPlateRules from "../helpers/settingPlateRules";

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
      <Box
        pos='relative'
        onClick={() => {
          if (isDone && settingPlateRules(data.plateContent, "toast")) {
            setValue("plateContent", [...data.plateContent, "toast"]);
            setStatus(null);
          }
        }}>
        {status ? (
          <Image
            src={`/${statusList[status]}.svg`}
            pointerEvents='none'
            cursor={isDone && "pointer"}
            userSelect='none'
            w={w}
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

import { Box, Center, Circle, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import foodList from "../contents/foodList";
import { isEqual, sample } from "lodash";

const statusColor = {
  eating: "#EDDDD6",
  waiting: "#92AA8D",
  errors: "#CE5242",
};

const CustomerTemplate = ({ id, src }) => {
  const { setValue, watch } = useFormContext();
  const data = watch();
  const status = data[id].status;
  const wishFood = data[id].order ?? "";
  const isCoffee = wishFood === "coffee";
  const [overTime, setOverTime] = useState();

  useEffect(() => {
    const controlTime = (s, time) => {
      if (status === s) {
        const t = setTimeout(() => {
          setValue(`${id}.status`, "waiting");
        }, [time]);
        return () => clearTimeout(t);
      }
    };
    controlTime("errors", 1000);
    controlTime("eating", 5000);
  }, [status]);

  useEffect(() => {
    if (!overTime) {
      const t = setTimeout(() => {
        setOverTime(true);
      }, [25000]);
      return () => clearTimeout(t);
    }
  }, [overTime]);

  const handleValidateFood = () => {
    if (data[id].order.includes("&")) {
      const checkContent = (s) => {
        return s?.split("&");
      };
      return isEqual(
        checkContent(data.targetItem).sort(),
        checkContent(data[id].order).sort()
      );
    } else {
      return data[id].order === data.targetItem;
    }
  };
  return (
    <Box
      userSelect="none"
      onDrop={(e) => {
        e.preventDefault();
        const key = `plateContent${data?.targetPlate}`;
        if (handleValidateFood()) {
          setValue(`${id}.status`, "eating");
          setValue(key, []);
          const controlNextOrder = () => {
            const t = setTimeout(() => {
              setValue(`${id}.order`, sample(foodList));
            }, [5000]);
            return () => clearTimeout(t);
          };
          setOverTime(false);
          controlNextOrder();
        } else {
          if (status === "eating") return;
          setValue(`${id}.status`, "errors");
          setValue(key, []);
        }
        console.log("DROP CUSTOMER");
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Center
        visibility={status !== "eating" ? "visible" : "hidden"}
        w={isCoffee ? "3em" : "7em"}
        h="4em"
      >
        <Image src={`/${wishFood}.svg`} w="100%" zIndex={2} />
      </Center>

      <Circle bg={statusColor[status]} w="10em" h="10em" pos="relative">
        {overTime ? (
          <Image top={1} pos="absolute" src={`${src}-angry.svg`} w="9.5em" />
        ) : (
          <Image top={0} pos="absolute" src={`${src}.svg`} w="9.5em" />
        )}
      </Circle>
    </Box>
  );
};

export default CustomerTemplate;

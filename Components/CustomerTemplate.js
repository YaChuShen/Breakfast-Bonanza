import { Box, Center, Circle, Image, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import foodList from "../contents/foodList";
import { sample } from "lodash";

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

  return (
    <Box
      onDrop={(e) => {
        e.preventDefault();
        const key = `plateContent${data?.targetPlate}`;
        if (data[id].order === data.targetItem) {
          setValue(`${id}.status`, "eating");
          setValue(key, []);
          const controlNextOrder = () => {
            const t = setTimeout(() => {
              setValue(`${id}.order`, sample(foodList));
            }, [5000]);
            return () => clearTimeout(t);
          };
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
      }}>
      <Center
        visibility={status !== "eating" ? "visible" : "hidden"}
        w={isCoffee ? "3em" : "7em"}
        h='4em'>
        <Image src={`/${wishFood}.svg`} w='100%' zIndex={2} />
      </Center>
      <Circle bg={statusColor[status]} w='10em' h='10em' pos='relative'>
        <Image top={3} pos='absolute' src={`${src}.svg`} w='10em'></Image>
      </Circle>
    </Box>
  );
};

export default CustomerTemplate;

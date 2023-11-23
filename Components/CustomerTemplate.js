import { Box, Center, Circle, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import foodList from "../contents/foodList";
import { isEqual, sample } from "lodash";
import { CUSTOMERNEXTORDER, CUSTOMEROVERTIME } from "../contents/rulse";
import scoreList from "../contents/scoreList";
import { motion } from "framer-motion";

const MotionComponent = motion(Box);

const statusColor = {
  eating: "#EDDDD6",
  waiting: "#92AA8D",
  errors: "#CE5242",
};

const circleW = 9.56;
const customerW = 9;

const CustomerImg = ({ src }) => {
  return (
    <Image
      top={1}
      left={2}
      pos="absolute"
      src={`${src}.svg`}
      w={`${customerW}em`}
    />
  );
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
      }, [CUSTOMEROVERTIME]);
      return () => clearTimeout(t);
    }
  }, [overTime]);

  const getScore = () => {
    setValue("score", (data.score += scoreList[data.targetItem]));
  };

  const minusScore = () => {
    setValue("score", (data.score -= 30));
  };

  const handleValidateFood = () => {
    if (data[id].order.includes("&")) {
      const checkContent = (s) => {
        return s?.split("&");
      };
      return isEqual(
        checkContent(data.targetItem)?.sort(),
        checkContent(data[id].order)?.sort()
      );
    } else {
      return data[id].order === data.targetItem;
    }
  };

  const controlNextOrder = () => {
    const t = setTimeout(() => {
      setValue(`${id}.order`, sample(foodList));
    }, [CUSTOMERNEXTORDER]);
    return () => clearTimeout(t);
  };

  return (
    <Box
      userSelect="none"
      onDrop={(e) => {
        e.preventDefault();
        const key = `plateContent${data?.targetPlate}`;
        if (handleValidateFood()) {
          setValue(`${id}.status`, "eating");
          controlNextOrder();
          getScore();
          setOverTime(false);
        } else {
          if (status === "eating") return;
          setValue(`${id}.status`, "errors");
          minusScore();
        }
        setValue(key, []);
        setValue("targetPlate", null);
        console.log("DROP CUSTOMER");
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      pos="relative"
    >
      {/* <Box pos="absolute" bottom="50%" left="-25%">
        <MotionComponent
          initial={{ opacity: 0.2, x: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.3 },
          }}
          transition={{ duration: 0.2, stiffness: 200 }}
        >
          <Text>+1</Text>
        </MotionComponent>
      </Box> */}
      <Center
        visibility={status !== "eating" ? "visible" : "hidden"}
        w={isCoffee ? "3em" : "7em"}
        h="4em"
      >
        <Image src={`/${wishFood}.svg`} w="100%" zIndex={2} />
      </Center>
      <Circle
        bg={statusColor[status]}
        w={`${circleW}em`}
        h={`${circleW}em`}
        pos="relative"
      >
        {overTime ? (
          <CustomerImg src={`${src}-angry`} />
        ) : (
          <CustomerImg src={src} />
        )}
      </Circle>
    </Box>
  );
};

export default CustomerTemplate;

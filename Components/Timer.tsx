import { Text } from "@chakra-ui/react";
import React from "react";

const TimeText = ({ t }:{t:number}) => <Text as='span'>{String(t).padStart(2, "0")}</Text>;

type TimerProps = {
  seconds: number;
  minutes: number;
};

function MyTimer({ seconds, minutes }: TimerProps) {
  return (
    <Text>
      <TimeText t={minutes} /> : <TimeText t={seconds} />
    </Text>
  );
}

const Timer = ({ seconds, minutes }: TimerProps) => {
  return <MyTimer seconds={seconds} minutes={minutes} />;
};

export default Timer;

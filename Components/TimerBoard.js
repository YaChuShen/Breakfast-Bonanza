import { AnimatePresence } from "framer-motion";
import React from "react";
import StartBoard from "Components/StartBoard";
import EndBoard from "Components/EndBoard";
import useExpiryTimer from "hooks/useExpiryTimer";
import ScoreSection from "./ScoreSection";

const TimerBoard = ({ setStart, start, session, data }) => {
  const { seconds, minutes, isRunning, timerStart, restart } = useExpiryTimer();

  return (
    <div>
      <AnimatePresence>
        {!start && (
          <StartBoard
            setStart={setStart}
            session={session}
            timerStart={timerStart}
            isRunning={isRunning}
          />
        )}
        {start && !isRunning && (
          <EndBoard
            score={data?.score}
            isRunning={isRunning}
            session={session}
            setStart={setStart}
            restart={restart}
          />
        )}
      </AnimatePresence>
      <ScoreSection data={data} minutes={minutes} seconds={seconds} />
    </div>
  );
};

export default TimerBoard;

'use client';

import { AnimatePresence } from 'framer-motion';
import React, { useEffect } from 'react';
import StartBoard from 'Components/StartBoard';
import EndBoard from 'Components/EndBoard';
import useExpiryTimer from 'hooks/useExpiryTimer';
import ScoreSection from './ScoreSection';
import { useTour } from '@reactour/tour';

const TimerBoard = ({ setStart, start, session, isTour, score, isLevel2 }) => {
  const { seconds, minutes, isRunning, timerStart, restart } = useExpiryTimer();
  const { setIsOpen, isOpen } = useTour();

  useEffect(() => {
    if (isTour) return;
    setIsOpen(true);
  }, []);

  return (
    <div>
      {!isOpen && (
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
              score={score}
              isRunning={isRunning}
              session={session}
              setStart={setStart}
              restart={restart}
              isLevel2={isLevel2}
            />
          )}
        </AnimatePresence>
      )}
      <ScoreSection score={score} minutes={minutes} seconds={seconds} />
    </div>
  );
};

export default TimerBoard;

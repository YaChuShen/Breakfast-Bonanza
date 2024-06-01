'use client';

import { AnimatePresence } from 'framer-motion';
import React, { useEffect } from 'react';
import StartBoard from 'Components/StartBoard';
import EndBoard from 'Components/EndBoard';
import useExpiryTimer from 'hooks/useExpiryTimer';
import ScoreSection from './ScoreSection';
import { useTour } from '@reactour/tour';
import { selectGameConfig } from 'store/features/gameConfigSlice';
import { useSelector } from 'react-redux';

const TimerBoard = ({ session, isTour, score, isLevel2 }) => {
  const { seconds, minutes, isRunning, timerStart, restart } = useExpiryTimer();
  const { setIsOpen, isOpen } = useTour();
  const { timerStatus } = useSelector(selectGameConfig);

  useEffect(() => {
    if (isTour) return;
    setIsOpen(true);
  }, []);

  /**
   * At the beginning, timerStatus === undefined. Next, it becomes true, and after it ends, it becomes false.
   */
  return (
    <div>
      {!isOpen && (
        <AnimatePresence>
          {timerStatus === undefined && (
            <StartBoard session={session} timerStart={timerStart} />
          )}
          {!isRunning && timerStatus !== undefined && (
            <EndBoard
              score={score}
              isRunning={isRunning}
              session={session}
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

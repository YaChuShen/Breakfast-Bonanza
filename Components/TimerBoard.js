'use client';

import { AnimatePresence } from 'framer-motion';
import React, { useEffect } from 'react';
import BeginBoard from 'Components/BeginBoard';
import EndBoard from 'Components/EndBoard';
import useExpiryTimer from 'hooks/useExpiryTimer';
import ScoreSection from './ScoreSection';
import { useTour } from '@reactour/tour';
import { selectGameConfig } from 'store/features/gameConfigSlice';
import { useSelector } from 'react-redux';
import ReadyStartBoard from './ReadyStartBoard';

const TimerBoard = ({ session, isTour, score, isLevel2 }) => {
  const { seconds, minutes, isRunning, timerStart, restart } = useExpiryTimer();
  const { timerStatus } = useSelector(selectGameConfig);

  const boardList = {
    initial: <BeginBoard session={session} />,
    touring: '',
    readyStarting: <ReadyStartBoard timerStart={timerStart} />,
    end: (
      <EndBoard
        score={score}
        isRunning={isRunning}
        session={session}
        restart={restart}
        isLevel2={isLevel2}
      />
    ),
  };

  console.log(timerStatus);

  return (
    <>
      <AnimatePresence>{boardList[timerStatus]}</AnimatePresence>
      <ScoreSection score={score} minutes={minutes} seconds={seconds} />
    </>
  );
};

export default TimerBoard;

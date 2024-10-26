'use client';

import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import BeginBoard from 'Components/BeginBoard';
import EndBoard from 'Components/EndBoard';
import useExpiryTimer from 'hooks/useExpiryTimer';
import ScoreSection from './ScoreSection';
import { selectGameConfig } from 'store/features/gameConfigSlice';
import { useSelector } from 'react-redux';
import ReadyStartBoard from './ReadyStartBoard';
import { dispatchAction } from '../helpers/dispatchAction';

const GameStageBoard = ({ session, isTour, score, isLevel2 }) => {
  const { seconds, minutes, isRunning, timerStart, restart } = useExpiryTimer();
  const { timerStatus } = useSelector(selectGameConfig);

  useEffect(() => {
    const initialTimerStatus = sessionStorage.getItem('isTour')
      ? 'readyStarting'
      : 'initial';
    dispatchAction({
      action: 'timerStatus',
      payload: { status: initialTimerStatus },
    });
  }, []);

  const boardList = {
    initial: <BeginBoard session={session} />,
    touring: '',
    readyStarting: (
      <ReadyStartBoard timerStart={timerStart} session={session} />
    ),
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

  return (
    <>
      <AnimatePresence>{boardList[timerStatus]}</AnimatePresence>
      <ScoreSection score={score} minutes={minutes} seconds={seconds} />
    </>
  );
};

export default GameStageBoard;

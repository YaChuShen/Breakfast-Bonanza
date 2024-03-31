import { useTimer } from 'react-timer-hook';

const useExpiryTimer = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 30000);
  const {
    seconds,
    minutes,
    isRunning,
    restart,
    start: timerStart,
  } = useTimer({
    expiryTimestamp: time,
    onExpire: () => console.warn('onExpire called'),
    autoStart: false,
  });

  return {
    seconds,
    minutes,
    isRunning,
    timerStart,
    restart,
  };
};

export default useExpiryTimer;

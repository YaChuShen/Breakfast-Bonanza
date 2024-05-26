import { useTimer } from 'react-timer-hook';
import { timer } from 'contents/rules';

const useExpiryTimer = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + timer);
  const {
    seconds,
    minutes,
    isRunning,
    restart,
    start: timerStart,
  } = useTimer({
    expiryTimestamp: time,
    onExpire: () => console.log('onExpire called'),
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

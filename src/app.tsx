import React, { useEffect, useRef, useState } from 'react';
import Button from './components/button';
import Heading from './components/heading';
import Timer from './components/timer';

const TIME_IN_SECONDS = 25 * 60;

const App = () => {
  const [time, setTime] = useState(TIME_IN_SECONDS);
  const intervalRef = useRef<NodeJS.Timeout | null>();
  const [isRunning, setIsRunning] = useState(false);
  const isDecremented = time < TIME_IN_SECONDS;

  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }, []);

  const showBreakNotification = () => new Notification('5 minute break!');

  const start = () => {
    if (intervalRef.current) {
      return;
    }

    setIsRunning(true);

    intervalRef.current = setInterval(
      () =>
        setTime(time => {
          if (time > 0) {
            return time - 1;
          }

          showBreakNotification();
          reset();

          return 0;
        }),
      1000,
    );
  };

  const stop = () => {
    if (!intervalRef.current) {
      return;
    }

    clearTimeout(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
  };

  const reset = () => {
    stop();
    setTime(TIME_IN_SECONDS);
  };

  return (
    <div>
      <Heading>React Pomodoro</Heading>
      <Timer time={time} />
      <div>
        {!isRunning && <Button onClick={start}>Start</Button>}
        {isRunning && <Button onClick={stop}>Stop</Button>}
        {isDecremented && <Button onClick={reset}>Reset</Button>}
      </div>
    </div>
  );
};

export default App;

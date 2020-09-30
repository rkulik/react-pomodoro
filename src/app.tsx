import React, { useRef, useState } from 'react';
import padTime from './utils/pad-time';

const TIME_IN_SECONDS = 10;

const App = () => {
  const [time, setTime] = useState(TIME_IN_SECONDS);
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  const intervalRef = useRef<NodeJS.Timeout | null>();
  const [isRunning, setIsRunning] = useState(false);
  const isDecremented = time < TIME_IN_SECONDS;

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
    <div className="app">
      <h1>React Pomodoro</h1>
      <div>
        {padTime(minutes)} : {padTime(seconds)}
      </div>
      <div>
        {!isRunning && <button onClick={start}>Start</button>}
        {isRunning && <button onClick={stop}>Stop</button>}
        {isDecremented && <button onClick={reset}>Reset</button>}
      </div>
    </div>
  );
};

export default App;

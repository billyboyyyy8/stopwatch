'use client'; // This tells Next.js this is a client-side component

import { useEffect, useState } from 'react';

const Stopwatch = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 59) {
            setMinutes((prevMinutes) => {
              if (prevMinutes === 59) {
                setHours((prevHours) => prevHours + 1);
                return 0;
              } else {
                return prevMinutes + 1;
              }
            });
            return 0;
          } else {
            return prevSeconds + 1;
          }
        });
      }, 1000);

      setTimer(interval);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const startStopwatch = () => setIsRunning(true);
  const stopStopwatch = () => {
    setIsRunning(false);
    clearInterval(timer);
  };
  const resetStopwatch = () => {
    setIsRunning(false);
    clearInterval(timer);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };

  const moveBackward = () => {
    if (seconds > 0) {
      setSeconds(seconds - 1);
    } else if (minutes > 0) {
      setMinutes(minutes - 1);
      setSeconds(59);
    } else if (hours > 0) {
      setHours(hours - 1);
      setMinutes(59);
      setSeconds(59);
    }
  };

  const moveForward = () => {
    if (seconds < 59) {
      setSeconds(seconds + 1);
    } else if (minutes < 59) {
      setMinutes(minutes + 1);
      setSeconds(0);
    } else if (hours < 23) {
      setHours(hours + 1);
      setMinutes(0);
      setSeconds(0);
    }
  };

  return (
    <div className="stopwatch-container">
      <div className="stopwatch" id="stopwatch">
        {`${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`}
      </div>
      <div className="buttons">
        <button onClick={startStopwatch} disabled={isRunning}>Start</button>
        <button onClick={stopStopwatch} disabled={!isRunning}>Stop</button>
        <button onClick={resetStopwatch}>Reset</button>
        <button onClick={moveBackward}>Backward</button>
        <button onClick={moveForward}>Forward</button>
      </div>
    </div>
  );
};

export default Stopwatch;

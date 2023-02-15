import { useEffect, useRef, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import TimerIndicator from "./timerIndicator/Index";

export default function Timer() {
  const [session, setSession] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [isSession, setIsSession] = useState(true);
  const [animationDuration, setAnimationDuration] = useState(session);
  const [minEnSec, setMinEnSec] = useState(session * 60);
  const [tour, setTour] = useState(0);
  const circleRef = useRef(null);
  const audio = useRef(null);

  const resetCircleAnimation = () => {
    circleRef.current.style.transitionDuration = "0s";
    setTimeout(() => {
      circleRef.current.style.transitionDuration = "2s";
    }, 1000);
  };

  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [timer, setTimer] = useState("");

  const start = () => {
    setIsRunning(true);
    setTimer(
      setInterval(() => {
        setSeconds((prevTime) => {
          if (prevTime === 0) {
            setMinutes((prevMin) => prevMin - 1);
            setSeconds(59);
          }
          return prevTime - 1;
        });
      }, 1000)
    );
  };

  const stop = () => {
    clearInterval(timer);
    setIsRunning(false);
  };

  const restart = (x) => {
    stop();
    setMinutes(x);
    setSeconds(0);
  };

  const increment = (count, setCount) => {
    if (!isRunning) {
      if (count >= 60) {
        setCount(60);
        return false;
      }
      setCount(count + 1);
    }
  };

  const decrement = (count, setCount) => {
    if (!isRunning) {
      if (count <= 1) {
        setCount(1);
        return false;
      }
      setCount(count - 1);
    }
  };

  const handleStart = () => {
    isRunning ? stop() : start();
  };

  const handleReset = () => {
    stop();
    setSession(25);
    setBreakLength(5);
    setIsSession(true);
    restart(25);
    setMinEnSec(25 * 60);
    setTour(0);
    !audio.current.paused && audio.current.pause();
    audio.current.currentTime = 0;
  };

  useEffect(() => {
    restart(session);
    setAnimationDuration(session);
    setMinEnSec(session * 60);
  }, [session]);

  useEffect(() => {
    setMinEnSec(minEnSec - 1);

    if (minutes === 0 && seconds === 0) {
      stop();
      audio.current.play();

      setTimeout(() => {
        setTour((prevTour) => prevTour + 1);
        setIsSession(!isSession);
      }, 2000);
    }
  }, [seconds]);

  useEffect(() => {
    if (tour === 0) {
      stop();
      setMinEnSec(session * 60);
    } else if (tour > 0) {
      if (isSession) {
        restart(session);
        setAnimationDuration(session);
        setMinEnSec(session * 60);
      } else {
        restart(breakLength);
        setAnimationDuration(breakLength);
        setMinEnSec(breakLength * 60);
      }
      start();
    }
    resetCircleAnimation();
  }, [isSession]);

  return (
    <div className="container">
      <TimerIndicator
        isSession={isSession}
        isRunning={isRunning}
        minutes={minutes}
        seconds={seconds}
        circleRef={circleRef}
        animationDuration={animationDuration}
        minEnSec={minEnSec}
      />
      <div className="block-button">
        <div id="session-label" className="label">
          <button
            id="session-decrement"
            onClick={() => decrement(session, setSession)}
          >
            <FaMinus />
          </button>
          <div>
            <span>Session Length</span>
            <div id="session-length">{session}</div>
          </div>
          <button
            id="session-increment"
            onClick={() => increment(session, setSession)}
          >
            <FaPlus />
          </button>
        </div>
        <div id="break-label" className="label">
          <button
            id="break-decrement"
            onClick={() => decrement(breakLength, setBreakLength)}
          >
            <FaMinus />
          </button>
          <div>
            <span>Break Length</span>
            <div id="break-length">{breakLength}</div>
          </div>
          <button
            id="break-increment"
            onClick={() => increment(breakLength, setBreakLength)}
          >
            <FaPlus />
          </button>
        </div>
        <div className="block-btn">
          <button id="reset" onClick={handleReset}>
            Reset
          </button>
          <button id="start_stop" onClick={handleStart}>
            {isRunning ? "stop" : "start"}
          </button>
        </div>
      </div>
      <audio
        id="beep"
        ref={audio}
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        preload="none"
      ></audio>
    </div>
  );
}

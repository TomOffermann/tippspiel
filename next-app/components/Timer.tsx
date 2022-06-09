interface TimerProps {
  expiresAt: number;
}

import React from "react";
import { useState, useEffect } from "react";

function fromSeconds(seconds: number) {
  let hs, mins, secs;
  hs = Math.floor(seconds / 3600);
  seconds = seconds % 3600;
  mins = Math.floor(seconds / 60);
  secs = seconds % 60;
  return { hs, mins, secs };
}

const Timer: React.FC<TimerProps> = (props) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const { hs, mins, secs } = fromSeconds(
      Math.floor((props.expiresAt - Date.now()) / 1000)
    );
    setHours(hs);
    setMinutes(mins);
    setSeconds(secs);
  }, [seconds]);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          if (hours === 0) {
            clearInterval(myInterval);
          } else {
            setHours(hours - 1);
            setMinutes(59);
            setSeconds(59);
          }
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <>
      <div className="timer-container">
        {minutes === 0 && seconds === 0 && hours === 0 ? (
          "00:00:00"
        ) : (
          <div className="timer">
            {" "}
            {hours < 10 ? `0${hours}` : hours}:
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </div>
        )}
      </div>
      <style jsx>{`
        .timer-container {
          width: 150px;
          text-align: center;
          font-weight: 400;
          font-size: 30px;
        }
      `}</style>
    </>
  );
};

export default Timer;

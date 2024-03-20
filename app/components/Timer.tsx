import React, { useEffect } from "react";
import { useGameContext } from "../Context/GameContext";

function Timer() {
  const { timerActive, setTimerActive, totalSeconds, setTotalSeconds } =
    useGameContext();

  useEffect(() => {
    setTimerActive(true);
  }, []);

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;

    if (timerActive) {
      interval = setInterval(() => {
        setTotalSeconds((prevTotalSeconds) => prevTotalSeconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerActive]);

  // Calculate minutes and seconds
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Format minutes and seconds to two decimal places
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return (
    <div className="bg-white rounded-lg p-3 w-36">
      <h1 className="text-center">
        Timer: {formattedMinutes}:{formattedSeconds}
      </h1>
    </div>
  );
}

export default Timer;

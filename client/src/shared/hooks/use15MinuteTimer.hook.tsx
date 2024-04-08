import { useEffect, useRef, useState } from "react";
import { timeToQuaterHour } from "../../configs/Application";

/**
 * @description A custom hook to create a 15 minute timer that counts down to the next quarter hour.
 * @returns {Object} - An object containing the time string and a function to reset the timer.
 * @returns {string} time - The time string in the format "mm:ss".
 * @returns {function} resetTimer - A function to reset the timer.
 */
export default function use15MinuteTimer() {
  const [timeString, setTimeString] = useState<string>("00:00");
  const [timer, setTimer] = useState<number>(0);
  const lastTime = useRef<number>(0);
  const interval = useRef<number>(0);
  const timeToNextQuarterHour = useRef<number>(timeToQuaterHour());

  const parseTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const startTimer = () => {
    if (interval.current) clearInterval(interval.current);

    interval.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          clearInterval(interval.current);
          return (timeToNextQuarterHour.current = timeToQuaterHour());
        }
        return prev - 1000;
      });
    }, 1000);
  };

  useEffect(() => {
    if (lastTime.current > 0) setTimer(lastTime.current);
    else setTimer(timeToNextQuarterHour.current);
    startTimer();
  }, []);

  useEffect(() => {
    setTimeString(parseTime(timer));
    lastTime.current = timer;
  }, [timer]);

  return { time: timeString };
}

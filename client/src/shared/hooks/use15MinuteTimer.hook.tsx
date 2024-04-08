import { useEffect, useState } from "react";
import { USER_REFRESH_INTERVAL } from "../../configs/Application";


/**
 * @description A custom hook to create a 15 minute timer that counts down to the next quarter hour.
 * @returns {Object} - An object containing the time string and a function to reset the timer.
 * @returns {string} time - The time string in the format "mm:ss".
 * @returns {function} resetTimer - A function to reset the timer.
 */
export default function use15MinuteTimer() {
    const [timeString, setTimeString] = useState<string>("00:00");
    const [ timer, setTimer ] = useState<number>(0);
    let interval: number;

    const timeToNextQuarterHour = USER_REFRESH_INTERVAL / 1000;
    
    const parseTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    const startTimer = () => {
        setTimer(timeToNextQuarterHour);

        interval = setInterval(() => {
            setTimer((prevTime) => {
                if (prevTime === 0) {
                    return timeToNextQuarterHour;
                }
                return prevTime - 1;
            });
        }, 1000);
    }

    const resetTimer = () => {
        setTimer(timeToNextQuarterHour);
        clearInterval(interval);
    }

    useEffect(() => {
        startTimer();
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setTimeString(parseTime(timer));
    }, [timer]);

    return { time: timeString, resetTimer };
}
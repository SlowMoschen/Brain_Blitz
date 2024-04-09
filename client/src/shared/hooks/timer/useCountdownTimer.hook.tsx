import { useRef, useState } from "react";


/**
 * @description A custom hook to create a countdown timer.
 * @param {number} startTime - The time in milliseconds to start the timer at.
 * @returns {Object} - An object containing the current time and a function to start the timer.
 * @returns {number} currentTime - The current time in milliseconds.
 * @returns {function} startTimer - A function to start the timer.
 */
export function useCountdownTimer(startTime: number) {
    const [currentTime, setCurrentTime] = useState<number>(startTime);
    const interval = useRef<number>(0);

    const startTimer = () => {
        if (interval.current) clearInterval(interval.current);

        interval.current = setInterval(() => {
            setCurrentTime((prev) => {
                if (prev <= 0) {
                    clearInterval(interval.current);
                    return 0;
                }
                return prev - 1000;
            });
        }, 1000);
    };

    return { currentTime, startTimer };
}
import { useState } from "react";
import { GAME } from "../../../configs/Application";

/**
 * @description A custom hook to track the score of the user while playing the quiz.
 * @returns {Object} - An object containing the current score, a function to increase the score, a function to decrease the score and a function to calculate the time bonus.
 * @returns {number} score - The current score of the user.
 * @returns {function} increaseScore - A function to increase the score.
 * @returns {function} decreaseScore - A function to decrease the score.
 * @returns {function} calculateTimeBonus - A function to calculate the time bonus.
 */
export function useScoreTracker() {
    const [currentScore, setCurrentScore] = useState<number>(0);

    const increaseScore = () => {
        setCurrentScore((prev: number) => prev + GAME.CORRECT_ANSWER_POINTS);
    };

    const decreaseScore = () => {
        setCurrentScore((prev: number) => {
            const newScore = prev - GAME.WRONG_ANSWER_POINTS;
            return newScore < 0 ? 0 : newScore;
        });
    };

    /**
     * @description A function to calculate the time bonus.
     * @param {number} time - The time in SECONDS.
     * @returns {void}
     */
    const calculateTimeBonus = (time: number) => {
        setCurrentScore((prev: number) => prev + time * GAME.POINTS_PER_SECOND);
    }

    return { currentScore, increaseScore, decreaseScore, calculateTimeBonus };
}
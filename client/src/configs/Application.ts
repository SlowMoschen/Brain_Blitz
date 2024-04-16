export const NODE_ENV: 'production' | 'development' = 'development';

export const TIMES = {
    COUNT_UP_DELAY: 0,
    COUNT_UP_DURATION: 2,
    SNACKBAR_DELAY: 4000,
    ERROR_MESSAGE_DURATION: 5000,
}

export const ENERGY_CONSUPMTION = 15;

export const GAME = {
    ENERGY_CONSUPMTION: 15,
    ENERGY_RECHARGE: 10,
    CORRECT_ANSWER_POINTS: 500,
    WRONG_ANSWER_POINTS: 300,
    POINTS_PER_SECOND: 10,
    QUIZ_COMPLETE_THRESHOLD: 2200,
    TIME_PER_QUIZ: 3 * 60 * 1000, // 3 minutes
}
/**
 * @description A function to calculate the time until the next quarter hour.
 * @returns {number} - The time in milliseconds until the next quarter hour.
 */
export const timeToQuaterHour = () => {
    const now = new Date();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();
    const timeToNextQuarterHour = 15 - (minutes % 15);
    return (timeToNextQuarterHour * 60 * 1000) - (seconds * 1000) - milliseconds;
}
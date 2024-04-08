export const TIMES = {
    COUNT_UP_DELAY: 0,
    COUNT_UP_DURATION: 2,
    SNACKBAR_DELAY: 4000,
    ERROR_MESSAGE_DURATION: 5000,
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
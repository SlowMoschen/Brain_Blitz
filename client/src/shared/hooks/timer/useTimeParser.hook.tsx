
/**
 * @description A custom hook to parse time in different formats.
 * @returns {Object} - An object containing functions to parse time in different formats.
 */
export function useTimeParser() {
    
    /**
     * @description A function to parse the time in milliseconds to a string in the format of "mm:ss".
     * @param {number} time - The time in milliseconds.
     * @returns {string} - The time string in the format "mm:ss".
     */
    const parseMinuteString = (time: number) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }

    /**
     * @description A function to parse the time in milliseconds to a string in the format of "hh:mm:ss".
     * @param {number} time - The time in milliseconds.
     * @returns {string} - The time string in the format "hh:mm:ss".
     * @example
     */
    const parseHourString = (time: number) => {
        const hours = Math.floor(time / 3600000);
        const minutes = Math.floor((time % 3600000) / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }

    const parseMillisecondsToSeconds = (time: number) => {
        return Math.floor(time / 1000);
    }

    const parseSecondsToMilliseconds = (time: number) => {
        return time * 1000;
    }

    const parseMinutesToMilliseconds = (time: number) => {
        return time * 60000;
    }

    const parseHoursToMilliseconds = (time: number) => {
        return time * 3600000;
    }

    return { parseMinuteString, parseHourString, parseMillisecondsToSeconds, parseSecondsToMilliseconds, parseMinutesToMilliseconds, parseHoursToMilliseconds };
}
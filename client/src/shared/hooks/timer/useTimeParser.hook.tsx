
/**
 * @description A custom hook to parse time in different formats.
 * @returns {Object} - An object containing functions to parse time in different formats.
 */
export function useTimeParser() {
    
    /**
     * @description A function to parse the time in milliseconds to a string in the format "mm:ss" or "hh:mm:ss" if the time is above one hour.
     * @param {number} time - The time in milliseconds.
     * @returns {string} - The time in the format "mm:ss" or "hh:mm:ss".
     */
    const parseToTimeString = (time: number) => {
        const isAboveOneHour = time >= 3600000;
        const MILSEC_1HOUR = 3600000;
        const MILSEC_1MINUTE = 60000;
        const MILSEC_1SECOND = 1000;

        const hours = Math.floor(time / MILSEC_1HOUR);
        const minutes = Math.floor((time % MILSEC_1HOUR) / MILSEC_1MINUTE);
        const seconds = Math.floor((time % MILSEC_1MINUTE) / MILSEC_1SECOND);


        if (isAboveOneHour) return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }

    return { parseToTimeString };
}
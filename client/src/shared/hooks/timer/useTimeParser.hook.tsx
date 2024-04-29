
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
        const hours = isAboveOneHour ? Math.floor(time / 3600000) : 0;
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);

        if (isAboveOneHour) return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }

    return { parseToTimeString };
}
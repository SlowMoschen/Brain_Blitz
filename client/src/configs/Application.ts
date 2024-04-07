export const TIMES = {
    COUNT_UP_DELAY: 0,
    COUNT_UP_DURATION: 2,
    SNACKBAR_DELAY: 4000,
    ERROR_MESSAGE_DURATION: 5000,
}

export const USER_REFRESH_INTERVAL = (15 - (new Date().getMinutes() % 15) + 1) * 60 * 1000; // on every .15th minute of the hour
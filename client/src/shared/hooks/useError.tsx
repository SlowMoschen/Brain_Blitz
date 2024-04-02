import { useState } from "react";
import { TIMES } from "../../../../client/src/shared/constants/times";


/**
 * This hook is responsible for managing error messages.
 * It returns an error message and a function to set the error message.
 * The function takes a message as an argument and sets the error message.
 * If the timeout argument is true, the error message is cleared after a timeout.
 * The timeout is defined in the TIMES.ERROR_MESSAGE_DURATION constant.
 * The error message is stored in the error state variable.
*/
const useError = (timeout: boolean): [string | null, (message: string) => void] => {
  const [error, setError] = useState<string | null>(null);

    const handleError = (message: string) => {
        setError(message);
        if (timeout) {
            setTimeout(() => {
                setError(null);
            }, TIMES.ERROR_MESSAGE_DURATION);
        }
    }

    return [ error, handleError ];
};

export default useError;

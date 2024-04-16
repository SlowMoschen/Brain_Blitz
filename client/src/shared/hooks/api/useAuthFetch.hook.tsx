import { useMutation } from "@tanstack/react-query";
import { HttpServiceInstance } from "../../services/httpService.service";

interface EmailDTO {
  email: string;
}

interface SignInDTO extends EmailDTO {
  password: string;
}

interface SignUpDTO extends SignInDTO {
  first_name: string;
  last_name: string;
}


const sendData = (endpoint: string, body?: EmailDTO | SignInDTO | SignUpDTO) => {
  return HttpServiceInstance.post(endpoint, body);
};

/**
 * This hook is used to send a request to the server for authentication.
 * Example: Sign in, sign up, forgot password, resend verification email.
 * It uses the useMutation hook from react-query to send the data.
 * It takes three arguments:
 * @param onSuccess is called when the request is successful.
 * @param onError is called when the request fails.
 * @param endpoint is the API endpoint to send the request to.
 * The hook returns a mutation object that can be used to send the data.
 * @returns mutation object
 */
export function useAuthFetch(
  onSuccess: () => void,
  onError: (err: Error) => void,
  endpoint: string
) {
  return useMutation({
    mutationFn: (body?: EmailDTO | SignInDTO | SignUpDTO) => sendData(endpoint, body),
    onSuccess,
    onError,
  });
}

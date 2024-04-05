import { useMutation } from "@tanstack/react-query";
import { URLS } from "../../../configs/Links";
import { HttpService } from "../../services/httpService.service";

export interface ContactDto {
  name: string;
  email: string;
  message: string;
}

const httpService = new HttpService();

function sendData(body: ContactDto) {
  return httpService.post(URLS.API_ENDPOINTS.APP.CONTACT, body);
}

// This hook is used to send a contact form to the server.
// It uses the useMutation hook from react-query to send the data.
// It takes two callbacks as arguments: onSuccess and onError.
// onSuccess is called when the request is successful.
// onError is called when the request fails.
// The hook returns a mutation object that can be used to send the data.
export function useContactFetch(onSuccess: () => void, onError: (err: string) => void) {
  return useMutation({ mutationFn: sendData, onSuccess, onError });
}

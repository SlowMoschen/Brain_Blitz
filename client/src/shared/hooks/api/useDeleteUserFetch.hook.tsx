import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { URLS } from "../../../configs/Links";
import { HttpServiceInstance } from "../../services/httpService.service";

function sendFetch() {
  return  HttpServiceInstance.delete(URLS.API_ENDPOINTS.APP.USER);
}

export function useDeleteUserFetch() {
    const redirect = useNavigate();

  const { mutate } = useMutation({
    mutationFn: sendFetch,
    onSuccess: () => {
      redirect(URLS.HOME);
    },
    onError: (err: Error) => {
      console.error(err);
    },
  });

  return mutate;
}

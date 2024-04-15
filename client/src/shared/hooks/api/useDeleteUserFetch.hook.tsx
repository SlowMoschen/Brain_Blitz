import { useMutation } from "@tanstack/react-query";
import { URLS } from "../../../configs/Links";
import { HttpService } from "../../services/httpService.service";
import { useNavigate } from "react-router-dom";

function sendFetch() {
  return new HttpService().delete(URLS.API_ENDPOINTS.APP.USER);
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

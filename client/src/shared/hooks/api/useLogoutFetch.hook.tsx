import { useMutation } from "@tanstack/react-query";
import { HttpService } from "../../services/httpService.service";
import { useNavigate } from "react-router-dom";
import { URLS } from "../../../configs/Links";

export function useLogoutFetch() {
  const httpService = new HttpService();
  const redirect = useNavigate();

  const logout = async () => {
    return await httpService.post(URLS.API_ENDPOINTS.AUTH.LOGOUT);
  };

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      redirect(URLS.HOME);
    },
    onError: (err: Error) => {
      console.error(err);
    },
  });

  return mutate;
}

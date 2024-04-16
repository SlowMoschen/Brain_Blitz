import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { URLS } from "../../../configs/Links";
import { HttpServiceInstance } from "../../services/httpService.service";

export function useLogoutFetch() {
  const redirect = useNavigate();

  const logout = async () => {
    return await HttpServiceInstance.post(URLS.API_ENDPOINTS.AUTH.LOGOUT);
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

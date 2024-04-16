import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { URLS } from "../../../configs/Links";
import { HttpServiceInstance } from "../../services/httpService.service";
import { timeToQuaterHour } from "../../../configs/Application";
import { IUser } from "../../types/User";
import { useNavigate } from "react-router-dom";

interface UpdateUserDTO {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
}

/**
 *
 * @description This hook contains all the queries related to the user.
 *
 */
export function useUserQueries() {
  /**
   * @description This hook is used to update the user details.
   * @param onSuccess This function is called when the update is successful.
   * @param onError This function is called when the update fails.
   * @returns The mutation object.
   */
  const useUpdateUser = (onSuccess: () => void, onError: (error: string) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (data: UpdateUserDTO) =>
        HttpServiceInstance.patch(URLS.API_ENDPOINTS.APP.USER, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
        onSuccess();
      },
      onError: (err: Error) => {
        console.error(err);
        onError(err.message);
      },
    });
  };

  /**
   * @description This hook is used to fetch the user details.
   * - The user details are fetched every 15 minutes.
   * - Checks if the user has access to the page.
   * @returns The user object, isPending, isError and noAccess.
   */
  const useUserFetch = () => {
    const {
      data: res,
      isPending,
      isError,
      error,
    } = useQuery({
      queryKey: ["user"],
      queryFn: () => HttpServiceInstance.get(URLS.API_ENDPOINTS.APP.USER),
      refetchInterval: timeToQuaterHour(),
      refetchOnWindowFocus: false,
      staleTime: timeToQuaterHour(),
    });

    const user: IUser = res?.data;
    const noAccess: boolean =
      error?.message.includes("Forbidden") || error?.message.includes("Unauthorized")
        ? true
        : false;

    return { user, isPending, isError, noAccess };
  };

  /**
   * @description This hook is used to delete the user.
   * - Redirects to the home page after the user is deleted.
   * @returns The mutation object.
   */
  const useDeleteUserFetch = () => {
    const redirect = useNavigate();

    return useMutation({
      mutationFn: () => HttpServiceInstance.delete(URLS.API_ENDPOINTS.APP.USER),
      onSuccess: () => {
        redirect(URLS.HOME);
      },
      onError: (err: Error) => {
        console.error(err);
      },
    });
  };

  return {
    useUpdateUser,
    useUserFetch,
    useDeleteUserFetch,
  };
}

import { useNavigate } from "react-router-dom";
import { timeToQuaterHour } from "../../../shared/utils/helpers";
import { URLS } from "../../../configs/Links";
import { IUser } from "../../types/User";
import { useMutationFactory } from "./_useMutationFactory";
import { useQueryFactory } from "./_useQueryFactory";

/**
 * @description This file contains all the hooks related for fetching and updating user data.
 * @exports useUserQuery - A hook to fetch logged in user data or a different user data.
 * @exports useUserMutation - A hook to update or delete user data.
 */

/**
 * @description A hook to fetch logged in user data or a different user data.
 * @param {UserQueryHookProps} { id } - The id of the user to fetch. If no id is provided, the logged in user data will be fetched.
 * @returns {IUser} user - The user data.
 */
interface UserQueryHookProps {
  id?: string;
}

export function useUserQuery({ id }: UserQueryHookProps) {
  const {data, isPending, isError, error } = useQueryFactory({
    endpoint: id ? `${URLS.API_ENDPOINTS.USER.USERS}/${id}` : URLS.API_ENDPOINTS.USER.USERS,
    queryKey: id ? ["differentUser", id] : ["user"],
    refetchInterval: !id ? timeToQuaterHour() : undefined,
    refetchOnWindowFocus: false,
    staleTime: !id ? timeToQuaterHour() : undefined,
  });

  const user: IUser = data?.data;

  const noAccess: boolean = error?.message.includes("Forbidden") || error?.message.includes("Unauthorized") ? true : false;

  return { user, isPending, isError, noAccess };
}

/**
 * @description A hook to update or delete user data.
 * @param {UserMutationHookProps} { type, onSuccess, onError } - The type of mutation, onSuccess and onError callbacks.
 * @returns {mutate} - A function to trigger the mutation.
 */

interface UpdateUserDTO {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
}

type UserMutationType = "UPDATE_USER" | "DELETE_USER";

interface UserMutationHookProps {
  type: UserMutationType;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useUserMutation({ type, onSuccess, onError }: UserMutationHookProps) {
  const redirect = useNavigate();

  return useMutationFactory<UpdateUserDTO>({
    method: type === "DELETE_USER" ? "delete" : "patch",
    endpoint: URLS.API_ENDPOINTS.USER.USERS,
    onSuccess: () => {
      if (type === "DELETE_USER") {
        redirect("/");
      }
      if (onSuccess) onSuccess();
    },
    onError: (error: string) => {
      if (onError) onError(error);
    },
    invalidateData: ["user"],
  });
}
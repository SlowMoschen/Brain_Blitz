import { useNavigate } from "react-router-dom";
import { timeToQuaterHour } from "../../../shared/utils/helpers";
import { URLS } from "../../../configs/Links";
import { IUser } from "../../types/User";
import { useMutationFactory } from "./_useMutationFactory";
import { useQueryFactory } from "./_useQueryFactory";

interface UpdateUserDTO {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
}

type UserMutationType = "UPDATE_USER" | "DELETE_USER";

interface UserQueryHookProps {
  id?: string;
}

interface UserMutationHookProps {
  type: UserMutationType;
  onSuccess?: () => void;
  onError?: (error: string) => void;
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
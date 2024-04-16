import { useQuery } from "@tanstack/react-query";
import { timeToQuaterHour } from "../../../configs/Application";
import { URLS } from "../../../configs/Links";
import { HttpServiceInstance } from "../../services/httpService.service";
import { IUser } from "../../types/User";

const getUser = async () => {
  console.log("Fetching user data");
  return await HttpServiceInstance.get(URLS.API_ENDPOINTS.APP.USER);
};

/**
 * @description Fetches user data from the server - will be refetched on every .15th minute of the hour to keep the data up-to-date.
 * @returns {Object} with following properties:
 * - user: User
 * - isPending: boolean
 * - isError: boolean
 * - noAccess: boolean
 */
export function useUserFetch(): {
  user: IUser;
  isPending: boolean;
  isError: boolean;
  noAccess: boolean;
} {
  const {
    data: res,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    refetchInterval: timeToQuaterHour(),
    refetchOnWindowFocus: false,
    staleTime: timeToQuaterHour(),
  });
  
  const user: IUser = res?.data;
  const noAccess: boolean =
    error?.message.includes("Forbidden") || error?.message.includes("Unauthorized") ? true : false;


  return { user, isPending, isError, noAccess };
}

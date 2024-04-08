import { useQuery } from "@tanstack/react-query";
import { URLS } from "../../../configs/Links";
import { HttpService } from "../../services/httpService.service";
import { User } from "../../types/User";
import { timeToQuaterHour } from "../../../configs/Application";

const httpService = new HttpService();
const getUser = async () => {
  return await httpService.get(URLS.API_ENDPOINTS.APP.USER);
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
  user: User;
  isPending: boolean;
  isError: boolean;
  noAccess: boolean;
} {
  const {
    data: res,
    isPending,
    isError,
    error,
  } = useQuery({ queryKey: ["user"], queryFn: getUser, refetchInterval: timeToQuaterHour() });

  const user: User = res?.data;
  const noAccess: boolean =
    error?.message.includes("Forbidden") || error?.message.includes("Unauthorized") ? true : false;

  return { user, isPending, isError, noAccess };
}

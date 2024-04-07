import { useQuery } from "@tanstack/react-query";
import { URLS } from "../../../configs/Links";
import { HttpService } from "../../services/httpService.service";
import { User } from "../../types/User";

const httpService = new HttpService(); 
const getUser = async () => {
    return await httpService.get(URLS.API_ENDPOINTS.APP.USER);
  }

export function useUser(): { user: User, isPending: boolean, isError: boolean, noAccess: boolean } {
    const { data: res, isPending, isError, error, } = useQuery({ queryKey: ['user'], queryFn: getUser });

    const user: User = res?.data;
    const noAccess: boolean = error?.message.includes('Forbidden') || error?.message.includes('Unauthorized') ? true : false;

    return { user, isPending, isError, noAccess };
}

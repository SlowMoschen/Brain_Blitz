import { useQuery } from "@tanstack/react-query";
import { URLS } from "../../../configs/Links";
import { HttpService } from "../../services/httpService.service";

const httpService = new HttpService(); 
const getUser = async () => {
    return await httpService.get(URLS.API_ENDPOINTS.APP.USER);
  }

export function useUser() {
    const { data: res, isPending, isError } = useQuery({ queryKey: ['user'], queryFn: getUser });

    const user = res?.data;

    return { user, isPending, isError };
}

import { useQuery } from "@tanstack/react-query";
import { URLS } from "../../../configs/Links";
import { HttpService } from "../../services/httpService.service";

const httpService = new HttpService();

function getSessionData() {
    return httpService.get(URLS.API_ENDPOINTS.AUTH.SESSION);
}

// This hook is used to check if the user has a session cookie.
export function useSessionFetch() {
    const { isPending, data } = useQuery({ queryKey: ["session"], queryFn: getSessionData , retry: false});
    
    const isAuthenticated = data?.status === 'ok' && data?.data?.message === "Authorized" ? true : false;

    return { isPending, isAuthenticated };
}
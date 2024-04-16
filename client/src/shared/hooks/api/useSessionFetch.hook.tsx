import { useQuery } from "@tanstack/react-query";
import { URLS } from "../../../configs/Links";
import { HttpServiceInstance } from "../../services/httpService.service";

/**
 * Hook makes a request to the server to check if the user is authenticated.
 * @returns {Object} - Object with the following properties:
 * - isPending: boolean - Indicates if the request is pending.
 * - isAuthenticated: boolean - Indicates if the user is authenticated.
 */
function getSessionData() {
    return HttpServiceInstance.get(URLS.API_ENDPOINTS.AUTH.SESSION);
}

export function useSessionFetch(): { isPending: boolean, isAuthenticated: boolean } {
    const { isPending, data } = useQuery({ queryKey: ["session"], queryFn: getSessionData , retry: false});
    
    const isAuthenticated: boolean = data?.status === 'ok' && data?.data?.message === "Authorized" ? true : false;

    return { isPending, isAuthenticated };
}
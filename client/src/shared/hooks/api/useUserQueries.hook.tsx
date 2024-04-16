import { useMutation, useQueryClient } from "@tanstack/react-query";
import { URLS } from "../../../configs/Links";
import { HttpServiceInstance } from "../../services/httpService.service";

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
    
    const useUpdateUser = (onSuccess: () => void, onError: (error: string) => void) => {
        const queryClient = useQueryClient();
    
        return useMutation({
            mutationFn: (data: UpdateUserDTO) => HttpServiceInstance.patch(URLS.API_ENDPOINTS.APP.USER, data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['user'] });
                onSuccess();
            },
            onError: (err: Error) => {
                console.error(err);
                onError(err.message);
            }
        })
    }

    return {
        useUpdateUser
    }
}
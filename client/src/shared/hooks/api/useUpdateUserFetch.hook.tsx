import { useMutation, useQueryClient } from "@tanstack/react-query";
import { URLS } from "../../../configs/Links";
import { HttpServiceInstance } from "../../services/httpService.service";

interface UpdateUserDTO {
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
}

export function useUpdateUser(onSuccess: () => void, onError: (error: string) => void) {
    const queryClient = useQueryClient();

    function updateUser(data: UpdateUserDTO) {
        return HttpServiceInstance.patch(URLS.API_ENDPOINTS.APP.USER, data)
    }

    const { mutate } = useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
            onSuccess();
        },
        onError: (err: Error) => {
            console.error(err);
            onError(err.message);
        }
    })

    return mutate;
}
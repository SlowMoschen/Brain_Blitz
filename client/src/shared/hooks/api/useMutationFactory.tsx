import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HttpServiceInstance } from "../../services/httpService.service";

/**
 * @description This hook is used to create a mutation object.
 * - The mutation object is used to make a request to the server.
 * - The request can be of type get, post, patch or delete.
 * @param method The method to be used for the request.
 * @param endpoint The endpoint for the request.
 * @param onSuccess This function is called when the request is successful.
 * @param onError This function is called when the request fails.
 * @param invalidateData The data that needs to be invalidated.
 * @returns The mutation object.
 */

type QuerySetupProps = {
  method: "get" | "post" | "patch" | "delete";
  endpoint: string;
  onSuccess: () => void;
  onError: (error: string) => void;
  invalidateData?: string[];
};

export function useMutationFactory<TData>({
  method,
  endpoint,
  onSuccess,
  onError,
  invalidateData,
}: QuerySetupProps) {
  const queryClient = useQueryClient();

  function getMutationFN(data?: TData) {
    switch (method) {
      case "get":
        return HttpServiceInstance.get(endpoint);
      case "post":
        return HttpServiceInstance.post(endpoint, data);
      case "patch":
        return HttpServiceInstance.patch(endpoint, data);
      case "delete":
        return HttpServiceInstance.delete(endpoint);
    }
  }

  return useMutation({
    mutationFn: (data?: TData) => getMutationFN(data),
    onSuccess: () => {
      if (invalidateData) queryClient.invalidateQueries({ queryKey: invalidateData });
      onSuccess();
    },
    onError: (err: Error) => {
      console.error(err);
      onError(err.message);
    },
  });
}

import { useQuery } from "@tanstack/react-query";
import { HttpServiceInstance } from "../../services/httpService.service";

/**
 * @description This hook is used to create a query object.
 * - The query object is used to make a request to the server.
 * - The request can be of type get.
 * @param endpoint The endpoint for the request.
 * @param queryKey The key for the query.
 * @param refetchInterval The interval after which the query is refetched.
 * @param refetchOnWindowFocus If the query should be refetched on window focus.
 * @param staleTime The time after which the query is considered stale.
 * @returns The query object.
 */

export type QuerySetupProps = {
  endpoint: string;
  queryKey: string[];
  refetchInterval?: number;
  refetchOnWindowFocus?: boolean;
  refetchOnMount?: boolean;
  staleTime?: number;
  retry?: number;
  gcTime?: number;
};

export function useQueryFactory({
  endpoint,
  queryKey,
  refetchInterval,
  refetchOnWindowFocus,
  refetchOnMount,
  staleTime,
  retry,
  gcTime,
}: QuerySetupProps) {
  return useQuery({
    queryKey,
    queryFn: () => HttpServiceInstance.get(endpoint),
    refetchInterval,
    refetchOnWindowFocus,
    refetchOnMount,
    staleTime,
    retry,
    gcTime,
  });
}

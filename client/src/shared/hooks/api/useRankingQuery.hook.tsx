import { URLS } from "../../../configs/Links";
import { useQueryFactory } from "./_useQueryFactory";

type QueryType = keyof typeof URLS.API_ENDPOINTS.RANKINGS

interface RankingQueriesProps {
    type: QueryType;
    id?: string;
}

export function useRankingQuery<TData>({type, id}: RankingQueriesProps) {

    const { data, isPending, isError, error } = useQueryFactory({
        queryKey: [type],
        endpoint: id ? URLS.API_ENDPOINTS.RANKINGS[type] + id : URLS.API_ENDPOINTS.RANKINGS[type],
        retry: 1,
        refetchOnMount: true,
        gcTime: 100
    });

    const rankings: TData[] = data?.data

    return {rankings, isPending, isError, error};
}
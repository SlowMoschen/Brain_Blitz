import { URLS } from "../../../configs/Links";
import { useQueryFactory } from "./_useQueryFactory";

export function useAdminQuery() {
    const {data: allUsersData , isPending: isAllUserPending, error: isAllUserError } = useQueryFactory({
        endpoint: URLS.API_ENDPOINTS.ADMIN.ALL_USERS,
        queryKey: ["allUsers"],
        refetchOnWindowFocus: true,
        retry: 1,
    });

    const { data: allQuizzesData, isPending: isAllQuizPending, error: isAllQuizError } = useQueryFactory({
        endpoint: URLS.API_ENDPOINTS.ADMIN.ALL_QUIZZES,
        queryKey: ["allQuizzes"],
        refetchOnWindowFocus: true,
        retry: 1,
    });

    const isPending = isAllUserPending || isAllQuizPending;
    const isError = isAllUserError || isAllQuizError;
    const allUsers = allUsersData?.data;
    const allQuizzes = allQuizzesData?.data;

    return { allUsers, allQuizzes, isPending, isError };
}
import { URLS } from "../../../configs/Links";
import { QuerySetupProps, useQueryFactory } from "./_useQueryFactory";

type AppQueryType = Exclude<keyof typeof URLS.API_ENDPOINTS.APP, "FORMS">;

interface AppQueryProps {
  type: AppQueryType;
  queryProps: Omit<QuerySetupProps, "endpoint">;
}

export function useAppQuery({ type, queryProps }: AppQueryProps) {
  return useQueryFactory({
    ...queryProps,
    endpoint: URLS.API_ENDPOINTS.APP[type],
  });
}

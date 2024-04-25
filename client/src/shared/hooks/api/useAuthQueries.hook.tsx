import { useNavigate } from "react-router-dom";
import { URLS } from "../../../configs/Links";
import { useMutationFactory } from "./_useMutationFactory";

/**
 * @description Mutauion hook for auth queries
 * - Sign in, Sign up, Logout, Forgot password, Resend verification email, Session
 * @param type - AuthQueryType - Type of auth query
 * @param onSuccess - Function to execute on success
 * @param onError - Function to execute on error
 * @returns Mutation hook
 */

// Union type of all possible auth query types - taken from Configs/Links.ts
type AuthQueryType = keyof typeof URLS.API_ENDPOINTS.AUTH;

interface AuthHookProps {
  type: AuthQueryType;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useAuthQuery({ type, onSuccess, onError }: AuthHookProps) {
  const redirect = useNavigate();

  return useMutationFactory({
    method: type === "SESSION" ? 'get' : 'post',
    endpoint: URLS.API_ENDPOINTS.AUTH[type],
    onSuccess: () => {
      if (type === "LOGOUT") redirect(URLS.HOME);
      if (type === "SESSION") redirect(URLS.DASHBOARD);
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      if (onError) onError(error);
    },
  });
}

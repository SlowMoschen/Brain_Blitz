import { useNavigate } from "react-router-dom";
import { URLS } from "../../../configs/Links";
import { useMutationFactory } from "./useMutationFactory";
import { useQueryFactory } from "./useQueryFactory";

/**
 * @description This hook is used to create hooks for authentication queries.
 * @returns The hooks for authentication queries.
 */

interface EmailDTO {
  email: string;
}

interface SignInDTO extends EmailDTO {
  password: string;
}

interface SignUpDTO extends SignInDTO {
  first_name: string;
  last_name: string;
}

export function useAuthQueries() {
  const useSignIn = (onSuccess: () => void, onError: (error: string) => void) => {
    return useMutationFactory<SignInDTO>({
      method: "post",
      endpoint: URLS.API_ENDPOINTS.AUTH.SIGNIN,
      onSuccess,
      onError,
    });
  };

  const useSignUp = (onSuccess: () => void, onError: (error: string) => void) => {
    return useMutationFactory<SignUpDTO>({
      method: "post",
      endpoint: URLS.API_ENDPOINTS.AUTH.SIGNUP,
      onSuccess,
      onError,
    });
  };

  const useForgotPassword = (onSuccess: () => void, onError: (error: string) => void) => {
    return useMutationFactory<EmailDTO>({
      method: "post",
      endpoint: URLS.API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
      onSuccess,
      onError,
    });
  };

  const useResendVerificationEmail = (onSuccess: () => void, onError: (error: string) => void) => {
    return useMutationFactory<EmailDTO>({
      method: "post",
      endpoint: URLS.API_ENDPOINTS.AUTH.RESEND_VERIFICATION_EMAIL,
      onSuccess,
      onError,
    });
  };

  const useLogout = () => {
    const redirect = useNavigate();

    return useMutationFactory({
      method: "post",
      endpoint: URLS.API_ENDPOINTS.AUTH.LOGOUT,
      onSuccess: () => {
        redirect(URLS.HOME);
      },
      onError: (error: string) => {
        console.error(error);
      },
    });
  };

  const useSessionCheck = () => {
    const { isPending, data } = useQueryFactory({
      endpoint: URLS.API_ENDPOINTS.AUTH.SESSION,
      queryKey: ["session"],
      retry: 1,
    });

    const isAuthenticated: boolean =
      data?.status === "ok" && data?.data?.message === "Authorized" ? true : false;

    return { isPending, isAuthenticated };
  };

  return {
    useSignIn,
    useSignUp,
    useForgotPassword,
    useResendVerificationEmail,
    useSessionCheck,
    useLogout,
  };
}

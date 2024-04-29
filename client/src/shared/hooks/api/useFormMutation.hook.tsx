import { URLS } from "../../../configs/Links";
import { useMutationFactory } from "./_useMutationFactory";

type MutationType = keyof typeof URLS.API_ENDPOINTS.APP.FORMS;

interface FormMutationProps {
  type: MutationType;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useFormMutation<T>({ type, onSuccess, onError }: FormMutationProps) {
  return useMutationFactory<T>({
    method: "post",
    endpoint: URLS.API_ENDPOINTS.APP.FORMS[type],
    onSuccess: () => {
      if (onSuccess) onSuccess();
    },
    onError: (error: string) => {
      if (onError) onError(error);
    },
  });
}

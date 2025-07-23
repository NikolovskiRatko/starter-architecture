import { useI18n } from 'vue-i18n';
import { useToast } from 'vue-toastification';
import { getAPIErrorMessage } from '@/helpers';

interface UseAppErrorsParams {
  setErrors: (errors: Record<string, string>) => void;
}

export default function useAppErrors(params?: UseAppErrorsParams) {
  const toast = useToast();
  const { t } = useI18n();

  const handleAPIError = (error: any) => {
    const errorMessage = getAPIErrorMessage(error, t);

    if (typeof errorMessage === 'string') {
      toast.error(t(errorMessage));
    } else {
      if (params?.setErrors) {
        params.setErrors(errorMessage);
      } else {
        Object.values(errorMessage).forEach((string) => {
          toast.error(string);
        });
      }
    }
  };

  return { handleAPIError };
}

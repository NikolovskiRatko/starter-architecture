import { useI18n } from 'vue-i18n';
import { useToast } from 'vue-toastification';
import { getAPIErrorMessage } from '@/helpers';

interface UseAppErrorsParams {
  setErrors: (errors: Record<string, string>) => void;
  translator?: (key: string) => string;
}

export default function useAppErrors({ setErrors, translator }: UseAppErrorsParams) {
  const toast = useToast();
  const { t } = useI18n();

  const handleAPIError = (error: any) => {
    const errorMessage = getAPIErrorMessage(error, translator);

    if (typeof errorMessage === 'string') {
      toast.error(t(errorMessage));
    } else {
      setErrors(errorMessage);
    }
  };

  return { handleAPIError };
}

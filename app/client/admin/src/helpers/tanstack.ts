import type { AxiosError } from 'axios';
import type { ComposerTranslation } from 'vue-i18n';
import { useToast } from 'vue-toastification';
import { getAPIErrorMessage } from './api';

const toast = useToast();

export const tanstackGenericOnErrorHandler = (
  error: AxiosError | object,
  t?: ComposerTranslation
) => {
  const message = getAPIErrorMessage(error);

  const showError = (msg: string) => {
    const translated = t ? t(msg) : msg;
    toast.error(translated);
  };

  if (typeof message === 'string') {
    showError(message);
  } else {
    Object.values(message).forEach((msg) => {
      showError(msg);
    });
  }
};

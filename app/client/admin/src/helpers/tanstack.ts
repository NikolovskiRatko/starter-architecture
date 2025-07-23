import { type AxiosError } from 'axios';
import { useToast } from 'vue-toastification';
import { getAPIErrorMessage } from './api';

export const tanstackGenericOnErrorHandler = (error: AxiosError | object) => {
  const message = getAPIErrorMessage(error);
  const toast = useToast();

  if (typeof message === 'string') {
    toast.error(message);
  } else {
    Object.values(message).forEach((string) => {
      toast.error(string);
    });
  }
};

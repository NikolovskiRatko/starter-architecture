import { type AxiosError } from 'axios';
import { getAPIErrorMessage } from './api';
import { useToast } from 'vue-toastification';

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
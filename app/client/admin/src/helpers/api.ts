import { isAxiosError, type AxiosError } from 'axios';
import { isLaravelValidationErrorResponse } from '@/helpers';

export const getAPIErrorMessage = (
  error: AxiosError | object,
  translator?: (key: string) => string
): string | Record<string, string> => {
  const translate = translator ?? ((msg: string) => msg);

  if (isAxiosError(error)) {
    const axiosErrorJson = error.toJSON();

    if ('message' in axiosErrorJson) {
      return translate(String(axiosErrorJson.message));
    }
  }

  if (isLaravelValidationErrorResponse(error)) {
    return Object.keys(error.errors).reduce(
      (acc, errorKey) => {
        acc[errorKey] = translate(error.errors[errorKey][0]);
        return acc;
      },
      {} as Record<string, string>
    );
  }

  if ('message' in error) {
    return translate(String(error.message));
  }

  return translate(String(error));
};

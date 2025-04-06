import { isAxiosError, type AxiosError } from "axios";
import { isLaravelValidationErrorResponse } from "@/helpers";

export const getAPIErrorMessage = (
  error: AxiosError | object,
): string | Record<string, string> => {
  if (isAxiosError(error)) {
    const axiosErrorJson = error.toJSON();

    if ("message" in axiosErrorJson) {
      return String(axiosErrorJson.message);
    }
  }

  if (isLaravelValidationErrorResponse(error)) {
    return Object.keys(error.errors).reduce(
      (acc, errorKey) => {
        acc[errorKey] = error.errors[errorKey][0];
        return acc;
      },
      {} as Record<string, string>,
    );
  }

  if ("message" in error) {
    return String(error.message);
  }

  return String(error);
};

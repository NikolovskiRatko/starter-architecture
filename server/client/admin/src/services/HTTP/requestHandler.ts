import axios from "axios";
import { HandlerRequest } from "@/services/HTTP/types";

export const handleRequest: HandlerRequest = async (url, options, data) => {
  const { onAbort, hasToFormatFailedRequest, method } = options ?? {};

  const requestOptions = {
    url,
    method,
    data,
  };

  try {
    const { data: newData, status } = await axios.request(requestOptions);
    return {
      success: true,
      data: newData,
      status,
    };
  } catch (error) {
    const message =
      error.response?.data?.message ?? "Error happened: No message";
    console.log(message); //TODO: Add modal to popup
    return {
      success: false,
      error,
      message,
    };
  }
};

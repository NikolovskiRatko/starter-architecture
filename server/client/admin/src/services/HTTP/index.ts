import { handleRequest } from "./requestHandler";
import { RequestType } from "./types";

export const get: RequestType = (url, data, options = {}) =>
  handleRequest(
    url,
    {
      ...options,
      method: "GET",
    },
    data,
  );

export const post: RequestType = (url, data, options = {}) =>
  handleRequest(
    url,
    {
      ...options,
      method: "POST",
    },
    data,
  );

export const patch: RequestType = (url, data, options = {}) =>
  handleRequest(
    url,
    {
      ...options,
      method: "PATCH",
    },
    data,
  );

export const del: RequestType = (url, data, options = {}) =>
  handleRequest(
    url,
    {
      ...options,
      method: "DELETE",
    },
    data,
  );

export const put: RequestType = (url, data, options = {}) =>
  handleRequest(
    url,
    {
      ...options,
      method: "PUT",
    },
    data,
  );

// export { useFetch } from './useFetch';

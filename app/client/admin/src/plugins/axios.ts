import axios from 'axios';

// baseUrl is a global injected by Laravel via the blade entry view.
declare const baseUrl: string;

axios.defaults.baseURL = baseUrl;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

// SPA-cookie mode: send the session cookie on cross-origin requests and let
// axios resolve CSRF from the Sanctum XSRF-TOKEN cookie automatically.
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

// 422 validation errors arrive in `error.response.data` with the Laravel
// shape `{ message, errors }`; reject with the body so callers see the
// errors object directly. Everything else flows through untouched.
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 422) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default (app: { axios?: typeof axios; $http?: typeof axios; config: { globalProperties: Record<string, unknown> } }) => {
  app.axios = axios;
  app.$http = axios;
  app.config.globalProperties.axios = axios;
  app.config.globalProperties.$http = axios;
};

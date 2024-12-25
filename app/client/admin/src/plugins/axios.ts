import axios from "axios";
import { useRouter } from "vue-router";

// baseUrl is a global variable, we get it through Laravel
declare const baseUrl: string;

axios.defaults.baseURL = baseUrl;
axios.defaults.headers = {
  "Content-type": "application/json",
};
axios.defaults.withCredentials = true;
axios.defaults.validateStatus = function (status) {
  return status === 401 || (status >= 200 && status < 300);
};
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.data.error == "Unauthorized action") {
      const router = useRouter();
      router.push({
        name: "dashboard",
      });
    }
    if (error.response.status == 422) {
      // console.log(error.response.)
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  },
);

export default (app) => {
  app.axios = axios;
  app.$http = axios;

  app.config.globalProperties.axios = axios;
  app.config.globalProperties.$http = axios;
};

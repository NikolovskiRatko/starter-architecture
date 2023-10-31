import axios from 'axios'

// baseUrl is a global variable, we get it through Laravel
declare const baseUrl: string

axios.defaults.baseURL = baseUrl
axios.defaults.headers = {
    'Content-type': 'application/json',
};
axios.defaults.withCredentials = true
axios.defaults.validateStatus = function (status) {
    return status === 422 ||
        status === 401 ||
        (status >= 200 && status < 300);
}

export default (app) => {
    app.axios = axios;
    app.config.globalProperties.axios = axios;
}

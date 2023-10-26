import axios, { AxiosInstance } from 'axios'

// baseUrl is a global variable, we get it through Laravel
declare const baseUrl

const apiClient: AxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-type': 'application/json',
    },
    withCredentials: true,
    validateStatus: function (status) {
        return status === 422 ||
            status === 401 ||
            status >= 200 &&
            status < 300
    }
})

export default apiClient
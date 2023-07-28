import axios, { AxiosInstance } from 'axios'

// baseUrl is a global variable, we get it through Laravel
declare const baseUrl

const apiClient: AxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-type': 'application/json',
    },
    validateStatus: function (status) {
        return status === 422 ||
            status === 401 ||
            status >= 200 &&
            status < 300
    }
})

// let token = document.head.querySelector('meta[name="csrf-token"]')
// let api_token = document.head.querySelector('meta[name="api-token"]')
//
// if (token) {
//     apiClient.defaults.headers.common['X-CSRF-TOKEN'] = token.content
// } else {
//     console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token')
// }
//
// if (api_token) {
//     apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + api_token.content
// }

export default apiClient
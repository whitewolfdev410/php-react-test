import axios from 'axios';
export const domain = `http://localhost:8000`

export const http = axios.create({
    baseURL: `${domain}`,
    headers: { 'Content-Type': 'application/json' }
})
http.interceptors.request.use(function (config: any) {
    // Do something before request is sent
    config.headers['Content-Type'] = 'application/json';
    config.headers['Access-Control-Allow-Origin'] = '*';
    return config;
}, function (error: any) {
    // Do something with request error
    return Promise.reject(error);
})
http.interceptors.response.use(
    function (response: any) {
        return Promise.resolve(response);
    },
    function (error: any) {
        return error.response;
    }
)
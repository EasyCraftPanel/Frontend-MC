import axios from 'axios';

// axios 配置
axios.defaults.timeout = 8000;
axios.defaults.baseURL = 'http://139.155.255.21:8888/api';

// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (localStorage.token) { //判断token是否存在
            config.headers.ReqJson = true;
            config.headers.Authorization = localStorage.token;  //将token设置成请求头
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

export default axios;

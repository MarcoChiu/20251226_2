import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig';
import { getToken } from '../utils/frontCookie';

axios.interceptors.request.use(
    (config) => {
        const token = getToken();

        //路徑有admin才需要 除了登出signin login
        if (token && (config.url?.includes('admin') || config.url?.includes('user/check')) && !config.url?.includes('signin') && !config.url?.includes('login') && !config.url?.includes('logout')) {
            config.headers.Authorization = token;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const login = async (data) => {
    const res = await axios.post(API_ENDPOINTS.signin, data);
    return res.data;
};

export const checkAuth = async () => {
    await axios.post(API_ENDPOINTS.usercheck);
};



import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig';

export const login = async (data) => {
    const res = await axios.post(API_ENDPOINTS.signin, data);
    return res.data;
};

export const checkAuth = async () => {
    await axios.post(API_ENDPOINTS.usercheck);
};

export const setupAxiosHeaders = (token) => {
    axios.defaults.headers.common['Authorization'] = token;
};

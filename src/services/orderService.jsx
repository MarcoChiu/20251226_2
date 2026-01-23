import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig';


export const createOrder = async (data) => {
    const payload = { data };
    const response = await axios.post(API_ENDPOINTS.order, payload);
    return response.data;
};


export const getOrders = async (page = 1) => {
    const url = `${API_ENDPOINTS.order}s?page=${page}`;
    const response = await axios.get(url);
    return response.data;
};


export const getOrder = async (orderId) => {
    const url = `${API_ENDPOINTS.order}/${orderId}`;
    const response = await axios.get(url);
    return response.data;
};


export const payOrder = async (orderId) => {
    const url = `${API_ENDPOINTS.order.replace(/order$/, 'pay')}/${orderId}`;
    const response = await axios.post(url);
    return response.data;
};

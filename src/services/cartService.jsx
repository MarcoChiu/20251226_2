import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig';


export const addCart = async (product_id, qty = 1) => {
    const res = await axios.post(API_ENDPOINTS.cart, {
        data: {
            product_id,
            qty
        }
    });
    return res.data;
};


export const getCart = async () => {
    const res = await axios.get(API_ENDPOINTS.cart);
    return res.data;
};


export const updateCart = async (id, product_id, qty) => {
    const res = await axios.put(`${API_ENDPOINTS.cart}/${id}`, {
        data: {
            product_id,
            qty
        }
    });
    return res.data;
};


export const clearCart = async (id) => {
    const res = await axios.delete(`${API_ENDPOINTS.cart}/${id}`);
    return res.data;
};


export const clearAllCart = async () => {
    const res = await axios.delete(`${API_ENDPOINTS.cart}s`);
    return res.data;
};

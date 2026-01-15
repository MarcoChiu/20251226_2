import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig';

// Admin
export const getProducts = async (page = 1) => {
    const res = await axios.get(`${API_ENDPOINTS.adminProduct}s`, {
        params: { page }
    });
    return res.data;
};

export const createProduct = async (data) => {
    await axios.post(API_ENDPOINTS.adminProduct, { data });
};

export const updateProduct = async (id, data) => {
    await axios.put(`${API_ENDPOINTS.adminProduct}/${id}`, { data });
};

export const deleteProduct = async (id) => {
    await axios.delete(`${API_ENDPOINTS.adminProduct}/${id}`);
};

// User
export const getUserProducts = async (page = 1) => {
    const res = await axios.get(API_ENDPOINTS.products, {
        params: { page }
    });
    return res.data;
};

export const getUserProduct = async (id) => {
    const res = await axios.get(`${API_ENDPOINTS.product}/${id}`);
    return res.data;
};



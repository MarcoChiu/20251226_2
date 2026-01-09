import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig';
import { getToken } from '../utils/frontCookie';

export const uploadImage = async (file) => {
    const token = getToken();
    const formData = new FormData();
    formData.append('file-to-upload', file);

    // console.log("Uploading to:", API_ENDPOINTS.uploadImage);

    const res = await axios.post(API_ENDPOINTS.uploadImage, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': token
        },
    });
    return res.data;
};

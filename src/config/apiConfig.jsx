const apiBaseUrl = import.meta.env.API_BASE_URL || '';
const myPath = import.meta.env.MY_PATH || '';

export const API_ENDPOINTS = {
    signin: apiBaseUrl ? `${apiBaseUrl}/admin/signin` : undefined,
    logout: apiBaseUrl ? `${apiBaseUrl}/admin/login` : undefined,
    usercheck: apiBaseUrl ? `${apiBaseUrl}/api/user/check` : undefined,
    adminProduct: apiBaseUrl && myPath ? `${apiBaseUrl}/api/${myPath}/admin/product` : undefined,
    uploadImage: apiBaseUrl && myPath ? `${apiBaseUrl}/api/${myPath}/admin/upload` : undefined,
}

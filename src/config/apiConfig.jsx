const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
const myPath = import.meta.env.VITE_MY_PATH || '';

export const API_ENDPOINTS = {
    signin: apiBaseUrl ? `${apiBaseUrl}/admin/signin` : undefined,
    logout: apiBaseUrl ? `${apiBaseUrl}/admin/login` : undefined,
    usercheck: apiBaseUrl ? `${apiBaseUrl}/api/user/check` : undefined,
    adminProduct: apiBaseUrl && myPath ? `${apiBaseUrl}/api/${myPath}/admin/product` : undefined,
    uploadImage: apiBaseUrl && myPath ? `${apiBaseUrl}/api/${myPath}/admin/upload` : undefined,
    products: apiBaseUrl && myPath ? `${apiBaseUrl}/api/${myPath}/products` : undefined,
    product: apiBaseUrl && myPath ? `${apiBaseUrl}/api/${myPath}/product` : undefined,
    cart: apiBaseUrl && myPath ? `${apiBaseUrl}/api/${myPath}/cart` : undefined,
}

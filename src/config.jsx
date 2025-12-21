const baseApiPath = import.meta.env.API_BASE_URL || '';
const myPath = import.meta.env.MY_PATH || '';

export const API_ENDPOINTS = {
    products: baseApiPath && myPath ? `${baseApiPath}/api/${myPath}/products` : undefined,

}
export const getApiUrl = (endpoint) => {
    return API_ENDPOINTS[endpoint] || endpoint
}

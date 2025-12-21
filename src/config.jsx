// 支援兩種來源：優先使用 VITE_ 前綴的 env（.env），若未設定則退回到由 vite.config.js 注入的變數
const baseApiPath =   import.meta.env.API_BASE_URL || '';
const myPath =  import.meta.env.MY_PATH || '';

export const API_ENDPOINTS = {
    products: baseApiPath && myPath ? `${baseApiPath}/api/${myPath}/products` : undefined,
 
}
export const getApiUrl = (endpoint) => {
    return API_ENDPOINTS[endpoint] || endpoint
}

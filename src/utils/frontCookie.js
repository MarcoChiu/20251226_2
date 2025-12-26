export const getToken = () => document.cookie.replace(/(?:(?:^|.*;\s*)fromtToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");

export const setToken = (token, expired) => {
    document.cookie = `fromtToken=${token}; expires=${new Date(expired)}; path=/`;
};

export const removeToken = () => {
    document.cookie = "fromtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

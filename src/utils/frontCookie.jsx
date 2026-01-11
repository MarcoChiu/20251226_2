export const getToken = () => document.cookie.replace(/(?:(?:^|.*;\s*)MarcoToken\s*=\s*([^;]*).*$)|^.*$/, "$1");

export const setToken = (token, expired) => {
    document.cookie = `MarcoToken=${token}; expires=${new Date(expired)}; path=/`;
};

export const removeToken = () => {
    document.cookie = "MarcoToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

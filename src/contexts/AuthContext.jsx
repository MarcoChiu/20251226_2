import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/apiConfig";
import { getToken, removeToken } from "../utils/frontCookie";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        (async () => {
            const token = getToken();
            if (token) {
                axios.defaults.headers.common['Authorization'] = token;
                try {
                    await axios.post(API_ENDPOINTS.usercheck);
                    setIsAuth(true);
                } catch (error) {
                    removeToken();
                    setIsAuth(false);
                }
            } else {
                setIsAuth(false);
            }
        })();
    }, []);

    const logout = () => {
        removeToken();
        setIsAuth(false);
    };

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

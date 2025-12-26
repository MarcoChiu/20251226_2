import { createContext, useContext, useState, useEffect } from "react";
import { getToken, removeToken } from "../utils/frontCookie";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const token = getToken();
        setIsAuth(!!token);
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

import { createContext, useContext, useState, useEffect } from "react";
import { getToken, removeToken } from "../utils/frontCookie";
import { checkAuth } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        (async () => {
            const token = getToken();
            if (token) {

                try {
                    await checkAuth();
                    setIsAuth(true);
                } catch (error) {
                    removeToken();
                    setIsAuth(false);
                } finally {
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

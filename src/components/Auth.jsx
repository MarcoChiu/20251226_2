import { useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from '../apiConfig';
import Loading from './Loading';
import { useAuth } from '../contexts/AuthContext';
import { getToken } from '../utils/frontCookie';

const Auth = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation(); //紀錄登入後要移回去該頁面
    const { isAuth, setIsAuth } = useAuth(); // 從 Context 取得狀態

    useEffect(() => {
        const token = getToken();

        if (!token) {
            setIsAuth(false);
            navigate('/login', { state: { from: location }, replace: true });
            return;
        }

        axios.defaults.headers.common['Authorization'] = token;

        axios.post(API_ENDPOINTS.usercheck)
            .then(() => {
                setIsAuth(true); // 驗證成功，更新 Context
            })
            .catch((err) => {
                console.error(err);
                setIsAuth(false); // 驗證失敗
                navigate('/login', { state: { from: location }, replace: true });
            });
    }, [navigate, setIsAuth, location]);

    if (!isAuth) {
        return <Loading />;
    }

    return (
        <>{children || <Outlet />}</>
    );
};

export default Auth;

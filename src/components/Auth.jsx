import { useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import Loading from './Loading';
import { useAuth } from '../contexts/AuthContext';
import { getToken } from '../utils/frontCookie';
import { checkAuth } from '../services/authService';

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



        (async () => {
            try {
                await checkAuth();
                setIsAuth(true); // 驗證成功，更新 Context
            } catch (err) {
                console.error(err);
                setIsAuth(false); // 驗證失敗
                navigate('/login', { state: { from: location }, replace: true });
            } finally {
            }
        })();
    }, [navigate, setIsAuth, location]);

    if (!isAuth) {
        return <Loading />;
    }

    return (
        <>{children || <Outlet />}</>
    );
};



export default Auth;

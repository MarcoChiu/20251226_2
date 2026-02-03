import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Loading from '../components/Loading';
import Toast from '../components/Toast';
import { AuthProvider } from '../contexts/AuthContext.jsx';
const Layout = () => {
    return (
        <>
            <AuthProvider>
                <NavBar />
                <Toast />
                <Suspense fallback={<Loading />}>
                    <Outlet />
                </Suspense>
            </AuthProvider>
        </>
    );
}
export default Layout;
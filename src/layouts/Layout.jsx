import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Loading from '../components/Loading';

const Layout = () => {
    return (
        <>
            <NavBar />
            <Suspense fallback={<Loading />}>
                <Outlet />
            </Suspense>

        </>
    );
}
export default Layout;
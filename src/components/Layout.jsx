import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Loading from './Loading';

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
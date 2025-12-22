import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Loading from './Loading';

const Layout = () => {
    return (
        <>
            <NavBar />
            <div className='App'>
                <Suspense fallback={<Loading />}>
                    <Outlet />
                </Suspense>
            </div>
        </>
    );
}
export default Layout;
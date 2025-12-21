import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Loading from './Loading';

// Layout 元件包含 NavBar
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
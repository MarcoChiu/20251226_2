import { useEffect, Suspense } from 'react';
import { Outlet, useLocation, useMatches } from 'react-router-dom';
import NavBar from './NavBar';
import Loading from './Loading';

// Layout 元件包含 NavBar
 const Layout = () => {
    const location = useLocation();
    const matches = useMatches();

    useEffect(() => {
        // 從目前的匹配路由中取得最後一個具有 title 的路由
        const lastMatch = matches[matches.length - 1];
        const title = lastMatch?.handle?.title || lastMatch?.route?.title || 'Marco';
        document.title = title;
    }, [location, matches]);

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
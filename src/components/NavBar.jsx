import { useEffect, useRef } from 'react';
import { NavLink, useLocation, useMatches } from 'react-router-dom';
import NavItem from './NavItem';
import { routes } from '../routes';
import { Collapse } from 'bootstrap';

const NavBar = () => {
    const location = useLocation();
    const matches = useMatches();
    const collapseRef = useRef(null);

    useEffect(() => {
        const collapseEl = collapseRef.current;
        if (collapseEl) {
            const bsCollapse = Collapse.getOrCreateInstance(collapseEl, {
                toggle: false
            });
            bsCollapse.hide();
        }

        // 從目前的匹配路由中由後往前搜尋第一個具有 title 的路由
        const currentMatchWithTitle = [...matches].reverse().find(m => m.handle?.title);
        const title = currentMatchWithTitle?.handle?.title || 'Marco';
        document.title = title;
    }, [location, matches]);

    // 取得主要路由（根路由的子路由）
    const mainRoutes = routes[0].children;

    // 遞迴獲取結構化的顯示路由
    const getNavTree = (routeList, parentPath = '') => {
        return routeList
            .filter(route => route.isShow)
            .map(route => {
                const currentPath = route.index ? parentPath : `${parentPath}/${route.path}`.replace(/\/+/g, '/');
                const visibleChildren = route.children ? getNavTree(route.children, currentPath) : [];

                return {
                    path: currentPath,
                    title: route.handle?.title || route.title,

                    children: visibleChildren
                };
            });
    };

    const navItems = getNavTree(mainRoutes);

    const toggleCollapse = () => {
        const collapseEl = collapseRef.current;
        if (collapseEl) {
            const bsCollapse = Collapse.getOrCreateInstance(collapseEl);
            bsCollapse.toggle();
        }
    };

    const closeCollapse = () => {
        const collapseEl = collapseRef.current;
        if (collapseEl) {
            const bsCollapse = Collapse.getOrCreateInstance(collapseEl);
            bsCollapse.hide();
        }
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/" onClick={closeCollapse}>Marco</NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleCollapse}
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav" ref={collapseRef}>
                    <ul className="navbar-nav">
                        {navItems.map((item, index) => (
                            <NavItem key={index} item={item} onItemClick={closeCollapse} />
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;
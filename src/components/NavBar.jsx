import { useEffect, useRef } from 'react';
import { NavLink, useLocation, matchRoutes, useNavigate } from 'react-router-dom';
import { routes } from '../routes';
import { Collapse, Dropdown } from 'bootstrap';
import { useAuth } from '../contexts/AuthContext';

const NavItem = ({ item, onItemClick }) => {
    const location = useLocation();
    const hasChildren = item.children && item.children.length > 0;
    const isChildActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');

    const toggleDropdown = (e) => {
        e.preventDefault();
        const dropdown = Dropdown.getOrCreateInstance(e.currentTarget);
        dropdown.toggle();
    };

    const activeClass = ({ isActive }) => {
        return `nav-link ${isActive ? "active" : ""}`;
    };

    return hasChildren ? (
        <li className="nav-item dropdown">
            <a
                className={`nav-link dropdown-toggle ${isChildActive ? 'active' : ''}`}
                href="#"
                role="button"
                aria-expanded="false"
                onClick={toggleDropdown}
            >
                {item.title}
            </a>
            <ul className="dropdown-menu">
                {item.children.map((child, childIdx) => (
                    <li key={childIdx}>
                        <NavLink
                            className="dropdown-item"
                            to={child.path}
                            onClick={(e) => {
                                // 取得父層的 dropdown 並隱藏
                                const toggleEl = e.target.closest('.dropdown').querySelector('.dropdown-toggle');
                                const dropdown = Dropdown.getOrCreateInstance(toggleEl);
                                dropdown.hide();
                                // 呼叫父層傳入的關閉選單函式
                                if (onItemClick) onItemClick();
                            }}
                        >
                            {child.title}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </li>
    ) : (
        <li className="nav-item">
            <NavLink className={activeClass} to={item.path} onClick={onItemClick}>
                {item.title}
            </NavLink>
        </li>
    );
}

const NavBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const collapseRef = useRef(null);
    const { isAuth, logout } = useAuth(); // 使用 Context

    useEffect(() => {
        const collapseEl = collapseRef.current;
        if (collapseEl) {
            const bsCollapse = Collapse.getOrCreateInstance(collapseEl, {
                toggle: false
            });
            bsCollapse.hide();
        }

        // 更新 document.title
        const baseTitle = 'Marco';

        // 使用 matchRoutes 來比對目前的 routes 設定，這樣可以確保取得自定義的 title 屬性
        const matches = matchRoutes(routes, location);

        let title = '';
        if (matches) {
            const currentMatch = [...matches].reverse().find(match => match.route?.title);
            title = currentMatch?.route?.title;
        }

        if (title) {
            document.title = `${title} - ${baseTitle}`;
        } else {
            document.title = baseTitle;
        }

    }, [location]);

    // 取得主要路由（根路由的子路由）
    const mainRoutes = routes[0].children;

    // 遞迴獲取結構化的顯示路由
    const getNavTree = (routeList, parentPath = '') => {
        let result = [];

        routeList.forEach(route => {
            // 如果路由設定為顯示
            if (route.isShow) {
                const currentPath = route.index ? parentPath : `${parentPath}/${route.path}`.replace(/\/+/g, '/');
                const visibleChildren = route.children ? getNavTree(route.children, currentPath) : [];

                result.push({
                    path: currentPath,
                    title: route.title,
                    children: visibleChildren
                });
            }
            // 如果路由是不顯示（或是像 AuthLayout 這種 wrapper）但有子路由
            // 且該路由沒有 path 屬性（表示它是 pathless layout route）
            // 我們就應該穿透它去抓取下面的子路由
            else if (!route.path && route.children) {
                const childItems = getNavTree(route.children, parentPath);
                result.push(...childItems);
            }
        });

        return result;
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

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        navigate('/');
        closeCollapse();
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
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            {isAuth ? (
                                <a className="nav-link" href="#" onClick={handleLogout}>登出</a>
                            ) : (
                                <NavLink className="nav-link" to="/login" onClick={closeCollapse}>登入</NavLink>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;
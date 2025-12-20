import { NavLink, useLocation } from 'react-router-dom';
import { routes } from '../routes';

export default function NavBar() {
    console.log('NavBar rendered');
    const location = useLocation();

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
                    title: route.title,
                    children: visibleChildren
                };
            });
    };

    const navItems = getNavTree(mainRoutes);

    const activeClass = ({ isActive }) => {
        return `nav-link ${isActive ? "active" : ""}`;
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">React班作業</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {navItems.map((item, index) => {
                            const hasChildren = item.children && item.children.length > 0;
                            // 檢查當前路徑是否屬於此下拉選單
                            const isChildActive = location.pathname.startsWith(item.path);

                            return hasChildren ? (
                                <li className="nav-item dropdown" key={index}>
                                    <a
                                        className={`nav-link dropdown-toggle ${isChildActive ? 'active' : ''}`}
                                        href="#"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        {item.title}
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <NavLink className="dropdown-item" to={item.path} end>
                                                {item.title}
                                            </NavLink>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                        {item.children.map((child, childIdx) => (
                                            <li key={childIdx}>
                                                <NavLink className="dropdown-item" to={child.path}>
                                                    {child.title}
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ) : (
                                <li className="nav-item" key={index}>
                                    <NavLink
                                        className={activeClass}
                                        to={item.path}
                                        style={item.path.includes('params') ? ({ isActive }) => { return { color: isActive ? 'green' : '', fontWeight: 'bold' } } : undefined}
                                    >
                                        {item.title}
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
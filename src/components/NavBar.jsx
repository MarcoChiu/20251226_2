import { NavLink } from 'react-router-dom';
import NavItem from './NavItem';
import { routes } from '../routes';

const NavBar = () => {
    //console.log('NavBar rendered');

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

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Marco</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {navItems.map((item, index) => (
                            <NavItem key={index} item={item} />
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;
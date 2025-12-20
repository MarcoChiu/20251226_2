import { NavLink, useLocation } from 'react-router-dom';

export default function NavItem({ item }) {
    const location = useLocation();
    const hasChildren = item.children && item.children.length > 0;
    const isChildActive = location.pathname.startsWith(item.path);

    const activeClass = ({ isActive }) => {
        return `nav-link ${isActive ? "active" : ""}`;
    };

    return hasChildren ? (
        <li className="nav-item dropdown">
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
        <li className="nav-item">
            <NavLink className={activeClass} to={item.path}>
                {item.title}
            </NavLink>
        </li>
    );
}

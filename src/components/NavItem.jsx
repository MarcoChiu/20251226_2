import { NavLink, useLocation } from 'react-router-dom';
import { Dropdown } from 'bootstrap';

 const NavItem = ({ item }) => {
    const location = useLocation();
    const hasChildren = item.children && item.children.length > 0;
    const isChildActive = location.pathname.startsWith(item.path);

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
                data-bs-toggle="dropdown"
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
            <NavLink className={activeClass} to={item.path}>
                {item.title}
            </NavLink>
        </li>
    );
}

 
export default NavItem;
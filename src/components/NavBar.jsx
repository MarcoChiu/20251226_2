import { NavLink } from 'react-router-dom';
export default function NavBar() {
    console.log('NavBar rendered');

    const activeClass = ({ isActive }) => {
        return `nav-link ${isActive ? "active" : ""}`;
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className={activeClass} to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={activeClass} to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={activeClass} to="/photo">相簿</NavLink>
                        </li>
                        <li className="nav-item">
                            {/* 點到頁面後自訂義 class  */}
                            <NavLink className={activeClass} to="/photo/query">query</NavLink>
                        </li>
                        <li className="nav-item">
                            {/* 點到頁面後自訂義 style  */}
                            <NavLink className={activeClass} style={({ isActive }) => { return { color: isActive ? 'green' : '', fontWeight: 'bold' } }} to="/photo/params">path</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
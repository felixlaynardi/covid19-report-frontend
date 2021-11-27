import './Navbar.css';

import {NavLink} from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div>
        <nav className="sidebar-container">
            <ul className="sidebar-list-box">
                <li className="sidebar-list">
                    <NavLink className="icon-home" activeClassName="active" exact to="/home"></NavLink>
                </li>
                <li className="sidebar-list">
                    <NavLink className="icon-bar-chart" activeClassName="active" to="/dashboard"></NavLink>
                </li>
                <li className="sidebar-list">
                    <NavLink className="icon-th-list" activeClassName="active" to="/data"></NavLink>
                </li>
            </ul>
        </nav>
        <nav className="topbar-container">
            <ul className="topbar-list-box">
                <li className="topbar-list">
                    <NavLink className="icon-home" activeClassName="active" exact to="/home"></NavLink>
                </li>
                <li className="topbar-list">
                    <NavLink className="icon-bar-chart" activeClassName="active" to="/dashboard"></NavLink>
                </li>
                <li className="topbar-list">
                    <NavLink className="icon-th-list" activeClassName="active" to="/data"></NavLink>
                </li>
            </ul>
        </nav>
    </div>
  );
}

export default Navbar;
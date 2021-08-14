import './Navbar.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
  

function Navbar() {
  return (
    <Router>
        <nav className="sidebar-container">
            <ul className="sidebar-list-box">
                <li className="sidebar-list">
                    <Link className="icon-home" to="/"></Link>
                </li>
                <li className="sidebar-list">
                    <Link className="icon-columns" to="/about"></Link>
                </li>
                <li className="sidebar-list">
                    <Link className="icon-bar-chart" to="/users"></Link>
                </li>
            </ul>
        </nav>
        <nav className="topbar-container">
            <ul className="topbar-list-box">
                <li className="topbar-list">
                    <Link className="icon-home" to="/"></Link>
                </li>
                <li className="topbar-list">
                    <Link className="icon-columns" to="/about"></Link>
                </li>
                <li className="topbar-list">
                    <Link className="icon-bar-chart" to="/users"></Link>
                </li>
            </ul>
        </nav>
    </Router>
  );
}

export default Navbar;
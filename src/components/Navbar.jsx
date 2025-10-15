import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import "./Navbar.css";

export default function Navbar({ onMenuClick }) {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="logo-placeholder"></div>
        <Link to="/" className="brand-title">Syed_Sneakers</Link>
      </div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/collection">Collection</Link>
        <Link to="/men">Men</Link>
        <Link to="/women">Women</Link>
        <Link to="/kids">Kids</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <div className="navbar-right">
        <FiMenu className="hamburger-icon" size={24} onClick={onMenuClick} />
      </div>
    </header>
  );
}

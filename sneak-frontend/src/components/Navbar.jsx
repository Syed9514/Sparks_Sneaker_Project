import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FiMenu, FiShoppingCart, FiHeart, FiUser } from "react-icons/fi";
import { toggleShoppingPanel, toggleSidebar, toggleProfileModal } from "../features/ui/uiSlice";
import "./Navbar.css";
import { API_BASE_URL } from "../utils/api";

export default function Navbar() {
  const dispatch = useDispatch();

  const { items: cartItems } = useSelector((state) => state.cart);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  return (
    <header className="navbar">
      {/* --- LEFT: Logo & Brand --- */}
      <div className="navbar-left">
        <Link to="/" className="logo-link">
          <div className="logo-placeholder"></div>
          {/* This text will be hidden on mobile via CSS */}
          <span className="brand-title">Sparks_Sneakers</span>
        </Link>
      </div>

      {/* --- CENTER: Navigation Links (Desktop Only) --- */}
      <nav className="navbar-center">
        <NavLink
          to="/"
          className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}
        >
          Home
        </NavLink>
        <NavLink
          to="/collection"
          className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}
        >
          Collection
        </NavLink>
        <NavLink
          to="/men"
          className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}
        >
          Men
        </NavLink>
        <NavLink
          to="/women"
          className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}
        >
          Women
        </NavLink>
        <NavLink
          to="/kids"
          className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}
        >
          Kids
        </NavLink>
      </nav>

      {/* --- RIGHT: Action Icons --- */}
      <div className="navbar-right">

        {/* Wishlist Icon - Desktop Only */}
        <Link
          to="/wishlist"
          className="icon-btn desktop-only"
          title="Wishlist"
        >
          <FiHeart size={22} />
          {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
        </Link>

        {/* Cart Icon - Desktop Only */}
        <Link
          to="/dashboard"
          className="icon-btn desktop-only"
          title="Cart"
        >
          <FiShoppingCart size={22} />
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </Link>

        {/* User Icon - Desktop Only */}
        <button
          className="icon-btn user-btn desktop-only"
          onClick={() => dispatch(toggleProfileModal())}
          title="Profile"
        >
          {user && user.avatar ? (
            <img
              src={`${API_BASE_URL}${user.avatar}`}
              alt="User"
              className="nav-avatar"
            />
          ) : (
            <FiUser size={22} />
          )}
        </button>

        {/* Hamburger Menu - Mobile Only */}
        <button className="icon-btn mobile-menu-btn" onClick={() => dispatch(toggleSidebar())}>
          <FiMenu size={24} />
          {/* Show dot if there are items in cart or wishlist */}
          {(cartCount > 0 || wishlistCount > 0) && <span className="badge-dot"></span>}
        </button>
      </div>
    </header>
  );
}
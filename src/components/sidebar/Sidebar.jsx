// src/components/sidebar/Sidebar.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSun,FiMoon,FiX, FiLogOut, FiPlus } from 'react-icons/fi';
import { useTheme } from '../../ThemeContext';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset, uploadAvatar } from '../../features/auth/authSlice';
import './Sidebar.css';

const API_BASE_URL = 'http://localhost:5000';

function Sidebar({ isOpen, onClose }) {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
    onClose();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);
      dispatch(uploadAvatar(formData));
    }
  };

  return (
    <>
      {isOpen && <div className="overlay" onClick={onClose}></div>}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-top-row">
          <button className="theme-toggle-btn" onClick={toggleTheme}>
             <span>{theme === 'light' ? <FiSun/> : <FiMoon/>}</span>
          </button>
          <button className="close-btn" onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>

        <div className="sidebar-header">
          <div className="avatar-container">
            <img 
              src={user ? `${API_BASE_URL}${user.avatar}` : `${API_BASE_URL}/backend/uploads/avatars/default.png`} 
              alt="User Avatar" 
              className="avatar-img"
            />
            {user && (
              <>
                <label htmlFor="avatar-upload" className="avatar-upload-btn">
                  <FiPlus />
                </label>
                <input 
                  id="avatar-upload" 
                  type="file" 
                  accept="image/*"
                  onChange={handleAvatarChange} 
                  style={{ display: 'none' }} 
                />
              </>
            )}
          </div>
          <h3 className="username">{user ? user.name : 'Guest'}</h3>
          {!user && (
            <Link to="/login" className="login-btn" onClick={onClose}>
              Login
            </Link>
          )}
        </div>

        <nav className="sidebar-nav">
          <Link to="/" onClick={onClose}>Home</Link>
          <Link to="/collection" onClick={onClose}>Collection</Link>
          <Link to="/men" onClick={onClose}>Men</Link>
          <Link to="/women" onClick={onClose}>Women</Link>
          <Link to="/kids" onClick={onClose}>Kids</Link>
          <Link to="/dashboard" onClick={onClose}>Dashboard</Link>
        </nav>

        {user && (
          <div className="sidebar-bottom">
            <button className="bottom-btn" onClick={handleLogout}>
              <FiLogOut /> Logout
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

export default Sidebar;
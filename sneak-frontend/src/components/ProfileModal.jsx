import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiX, FiLogOut, FiClock, FiUser } from 'react-icons/fi';
import { closeProfileModal, openShoppingPanel } from '../features/ui/uiSlice'; // Import actions
import { logout, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import './ProfileModal.css'; // We will create this CSS

const API_BASE_URL = 'http://localhost:5000';

export default function ProfileModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isProfileModalOpen } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);

  if (!isProfileModalOpen) return null;

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    dispatch(closeProfileModal());
    navigate('/');
  };

  const handleOpenHistory = () => {
    dispatch(closeProfileModal());
    // Open Shopping Panel and potentially switch tab (logic handled in ShoppingPanel)
    // For now, we just open the panel. You might want to pass a specific tab later.
    dispatch(openShoppingPanel()); 
  };

  return (
    <div className="modal-overlay" onClick={() => dispatch(closeProfileModal())}>
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Account</h3>
          <button className="close-btn" onClick={() => dispatch(closeProfileModal())}>
            <FiX size={24} />
          </button>
        </div>

        <div className="modal-body">
          {user ? (
            <>
              <div className="user-details">
                <img 
                  src={user.avatar ? `${API_BASE_URL}${user.avatar}` : `${API_BASE_URL}/uploads/avatars/default.png`} 
                  alt="Profile" 
                  className="modal-avatar"
                />
                <div className="user-text">
                  <span className="modal-name">{user.name}</span>
                  <span className="modal-email">{user.email}</span>
                </div>
              </div>
              
              <div className="modal-actions">
                <button className="modal-action-btn" onClick={handleOpenHistory}>
                  <FiClock /> Order History
                </button>
                <button className="modal-action-btn logout" onClick={handleLogout}>
                  <FiLogOut /> Logout
                </button>
              </div>
            </>
          ) : (
            <div className="guest-view">
               <FiUser size={40} className="guest-icon"/>
               <p>You are not logged in.</p>
               <button className="login-btn-modal" onClick={() => {
                   dispatch(closeProfileModal());
                   navigate('/login');
               }}>
                   Login / Sign Up
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
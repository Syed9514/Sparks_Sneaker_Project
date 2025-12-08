import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiX, FiLogOut, FiClock, FiUser } from 'react-icons/fi';
import { closeProfileModal, openShoppingPanel } from '../features/ui/uiSlice'; // Import actions
import { logout, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import './ProfileModal.css';
import { API_BASE_URL } from '../utils/api';

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
              <div className="user-text-only">
                <span className="modal-welcome-sm">Welcome back,</span>
                <span className="modal-name-lg">{user.name}</span>
                <span className="modal-email-sm">{user.email}</span>
              </div>

              <div className="modal-actions">
                <button className="modal-action-btn primary" onClick={() => {
                  dispatch(closeProfileModal());
                  navigate('/account');
                }}>
                  <FiUser size={22} /> Account Details
                </button>
                <button className="modal-action-btn logout" onClick={handleLogout}>
                  <FiLogOut /> Logout
                </button>
              </div>
            </>
          ) : (
            <div className="guest-card">
              <div className="guest-card-content">
                <div className="guest-icon-wrapper">
                  <FiUser className="guest-icon-large" />
                </div>
                <h3>Welcome to Sparks</h3>
                <p>Join the community to unlock exclusive drops, track your orders, and more.</p>
                <button
                  className="login-btn-modern"
                  onClick={() => {
                    dispatch(closeProfileModal());
                    navigate('/login');
                  }}
                >
                  Login / Sign Up
                </button>
              </div>
              <div className="guest-card-visual">
                {/* Abstract or geometric shape for visual interest */}
                <div className="visual-circle"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
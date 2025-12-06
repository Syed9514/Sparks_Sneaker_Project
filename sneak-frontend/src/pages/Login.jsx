// src/pages/Login.jsx
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, register, reset } from '../features/auth/authSlice';
import { FiArrowRight, FiUser, FiMail, FiLock } from 'react-icons/fi';
import { useToast } from '../context/ToastContext';
import './Login.css';

function Login() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      showToast(message, 'error');
    }

    if (isSuccess || user) {
      navigate('/dashboard');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch, showToast]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (isLoginMode) {
      const userData = { email, password };
      dispatch(login(userData));
    } else {
      const userData = { name, email, password };
      dispatch(register(userData));
    }
  };

  return (
    <div className="login-page-split">

      {/* LEFT PANEL: Form Section */}
      <div className="login-form-section">
        <div className="brand-header">
          <h2>Sparks_Sneakers</h2>
        </div>

        <div className="form-wrapper">
          <div className="form-header">
            <h1>{isLoginMode ? 'Welcome Back' : 'Create Account'}</h1>
            <p>{isLoginMode ? 'Enter your details to access your account.' : 'Join us to get exclusive offers and drops.'}</p>
          </div>

          <form onSubmit={onSubmit} className="modern-form">

            {!isLoginMode && (
              <div className="input-group">
                <FiUser className="input-icon" />
                <input
                  type="text"
                  name="name"
                  value={name}
                  placeholder="Full Name"
                  onChange={onChange}
                  required
                />
              </div>
            )}

            <div className="input-group">
              <FiMail className="input-icon" />
              <input
                type="email"
                name="email"
                value={email}
                placeholder="Email Address"
                onChange={onChange}
                required
              />
            </div>

            <div className="input-group">
              <FiLock className="input-icon" />
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={onChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn-modern" disabled={isLoading}>
              {isLoading ? 'Processing...' : (isLoginMode ? 'Sign In' : 'Sign Up')} <FiArrowRight />
            </button>
          </form>

          <div className="toggle-text">
            {isLoginMode ? "Don't have an account? " : "Already have an account? "}
            <span onClick={() => setIsLoginMode(!isLoginMode)}>
              {isLoginMode ? 'Sign Up' : 'Log In'}
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Visual Showcase */}
      <div className="login-visual-section">
        <div className="visual-content">
          <div className="floating-shoe">
            {/* Using the image identified in assets */}
            <img src="/assets/shoe6-nobg.png" alt="Featured Sneaker" />
          </div>
          <div className="visual-text">
            <h3>Step Into the Future</h3>
            <p>Discover the latest collection of premium sneakers designed for comfort and style.</p>
          </div>

          {/* Decorative Circles */}
          <div className="circle c1"></div>
          <div className="circle c2"></div>
        </div>
      </div>

    </div>
  );
}

export default Login;
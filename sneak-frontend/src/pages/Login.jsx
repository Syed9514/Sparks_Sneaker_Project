// src/pages/Login.jsx
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, register, reset } from '../features/auth/authSlice';
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

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      alert(message); // You can replace this with a better notification
    }

    if (isSuccess || user) {
      navigate('/dashboard'); // Redirect after login/register
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

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
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-toggle">
          <button
            className={isLoginMode ? 'active' : ''}
            onClick={() => setIsLoginMode(true)}
          >
            Login
          </button>
          <button
            className={!isLoginMode ? 'active' : ''}
            onClick={() => setIsLoginMode(false)}
          >
            Sign Up
          </button>
        </div>

        <section className="auth-heading">
          <h1>{isLoginMode ? 'Welcome Back!' : 'Create an Account'}</h1>
          <p>{isLoginMode ? 'Please log in to continue' : 'Get started with your new account'}</p>
        </section>

        <section className="auth-form">
          <form onSubmit={onSubmit}>
            {!isLoginMode && ( // <-- Conditionally render the name field
              <div className="form-group">
                 <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  placeholder="Enter your name"
                  onChange={onChange}
                  required
                />
              </div>
            )}
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                placeholder="Enter password"
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn-submit" disabled={isLoading}>
                {isLoading ? 'Processing...' : (isLoginMode ? 'Login' : 'Create Account')}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Login;
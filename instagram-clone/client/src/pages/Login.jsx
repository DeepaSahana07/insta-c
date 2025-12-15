import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { login, isAuthenticated, loading, error, clearError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  useEffect(() => {
    clearError();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData.email, formData.password);
    if (result.success) {
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-phone-mockup">
          <img src="/src/assets/Instagram_logo.svg.png" alt="Instagram" className="phone-image" />
        </div>
        
        <div className="auth-form-container">
          <div className="auth-form-box">
            <div className="instagram-logo">
              <img src="/src/assets/Instagram_text.svg" alt="Instagram" />
            </div>

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Phone number, username, or email"
                  value={formData.email}
                  onChange={handleChange}
                  className="auth-input"
                  required
                />
              </div>

              <div className="input-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="auth-input"
                  required
                />
              </div>

              <button
                type="submit"
                className="auth-btn-primary"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Log in'}
              </button>
            </form>

            <div className="auth-divider">
              <div className="divider-line"></div>
              <span className="divider-text">OR</span>
              <div className="divider-line"></div>
            </div>

            <button className="facebook-login">
              <i className="bi bi-facebook"></i>
              Log in with Facebook
            </button>

            <Link to="/forgot-password" className="forgot-link">
              Forgot password?
            </Link>
          </div>

          <div className="auth-signup-box">
            <p>Don't have an account? <Link to="/register" className="signup-link">Sign up</Link></p>
          </div>

          <div className="app-download">
            <p>Get the app.</p>
            <div className="download-buttons">
              <img src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png" alt="Download on App Store" />
              <img src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png" alt="Get it on Google Play" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
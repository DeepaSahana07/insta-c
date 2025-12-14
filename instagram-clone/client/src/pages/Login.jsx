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
    <div className="auth-page">
      <div className="auth-container-new">
        <div className="auth-card-new">
          <div className="instagram-logo-auth">Instagram</div>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group-auth">
              <input
                type="email"
                className="form-input-auth"
                name="email"
                placeholder="Phone number, username, or email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group-auth">
              <input
                type="password"
                className="form-input-auth"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-auth-primary"
              disabled={loading}
            >
              Log in
            </button>
          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <button className="btn-facebook">
            <i className="bi bi-facebook"></i>
            Log in with Facebook
          </button>

          <Link to="/forgot-password" className="forgot-password">
            Forgot password?
          </Link>
        </div>

        <div className="auth-card-new auth-switch">
          <span>Don't have an account? </span>
          <Link to="/register" className="auth-link">Sign up</Link>
        </div>

        <div className="auth-footer">
          <div className="footer-links-auth">
            <a href="#">Meta</a>
            <a href="#">About</a>
            <a href="#">Blog</a>
            <a href="#">Jobs</a>
            <a href="#">Help</a>
            <a href="#">API</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Locations</a>
            <a href="#">Instagram Lite</a>
            <a href="#">Meta AI</a>
            <a href="#">Threads</a>
          </div>
          <div className="footer-copyright">
            <select className="language-select">
              <option>English</option>
            </select>
            <span>© 2025 Instagram from Meta</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
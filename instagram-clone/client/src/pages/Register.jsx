import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: ''
  });
  const { register, isAuthenticated, loading, error, clearError } = useAuth();
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
    
    const submitData = new FormData();
    submitData.append('username', formData.username);
    submitData.append('email', formData.email);
    submitData.append('password', formData.password);
    submitData.append('fullName', formData.fullName);

    const result = await register(submitData);
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
            
            <p className="signup-subtitle">Sign up to see photos and videos from your friends.</p>

            <button className="facebook-login">
              <i className="bi bi-facebook"></i>
              Log in with Facebook
            </button>

            <div className="auth-divider">
              <div className="divider-line"></div>
              <span className="divider-text">OR</span>
              <div className="divider-line"></div>
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
                  placeholder="Mobile Number or Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="auth-input"
                  required
                />
              </div>

              <div className="input-group">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="auth-input"
                  required
                />
              </div>

              <div className="input-group">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
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
                  minLength="6"
                />
              </div>

              <p className="terms-text">
                By signing up, you agree to our <a href="#" className="terms-link">Terms</a>, 
                <a href="#" className="terms-link">Privacy Policy</a> and <a href="#" className="terms-link">Cookies Policy</a>.
              </p>

              <button
                type="submit"
                className="auth-btn-primary"
                disabled={loading}
              >
                {loading ? 'Signing up...' : 'Sign up'}
              </button>
            </form>
          </div>

          <div className="auth-signup-box">
            <p>Have an account? <Link to="/login" className="signup-link">Log in</Link></p>
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

export default Register;
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
    <div className="auth-page">
      <div className="auth-container-new">
        <div className="auth-card-new">
          <div className="instagram-logo-auth">Instagram</div>
          
          <p className="auth-subtitle">Sign up to see photos and videos from your friends.</p>

          <button className="btn-facebook">
            <i className="bi bi-facebook"></i>
            Log in with Facebook
          </button>

          <div className="auth-divider">
            <span>OR</span>
          </div>

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
                placeholder="Mobile Number or Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group-auth">
              <input
                type="text"
                className="form-input-auth"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group-auth">
              <input
                type="text"
                className="form-input-auth"
                name="username"
                placeholder="Username"
                value={formData.username}
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
                minLength="6"
              />
            </div>

            <p className="auth-terms">
              People who use our service may have uploaded your contact information to Instagram. 
              <a href="#" className="auth-link">Learn More</a>
            </p>

            <p className="auth-terms">
              By signing up, you agree to our <a href="#" className="auth-link">Terms</a>, 
              <a href="#" className="auth-link">Privacy Policy</a> and <a href="#" className="auth-link">Cookies Policy</a>.
            </p>

            <button
              type="submit"
              className="btn-auth-primary"
              disabled={loading}
            >
              Sign up
            </button>
          </form>
        </div>

        <div className="auth-card-new auth-switch">
          <span>Have an account? </span>
          <Link to="/login" className="auth-link">Log in</Link>
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

export default Register;
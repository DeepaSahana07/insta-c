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
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const { register, isAuthenticated, loading, error, clearError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    clearError();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUrlChange = (e) => {
    setProfilePictureUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submitData = {
      ...formData,
      profilePicture: profilePictureUrl || `https://i.pravatar.cc/150?u=${formData.username}`
    };

    const result = await register(submitData);
    if (result.success) {
      navigate('/home', { replace: true });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Instagram</h1>

        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="login-input"
            required
          />

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="login-input"
            required
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="login-input"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="login-input"
            required
            minLength="6"
          />

          <input
            type="url"
            name="profilePictureUrl"
            placeholder="Profile Picture URL (optional)"
            value={profilePictureUrl}
            onChange={handleUrlChange}
            className="login-input"
          />
          {profilePictureUrl && (
            <div className="preview-container">
              <img src={profilePictureUrl} alt="Preview" className="preview-image" onError={(e) => e.target.style.display = 'none'} />
            </div>
          )}

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            Sign up
          </button>
        </form>

        <p className="login-switch">
          Have an account? <Link to="/login" className="login-link">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
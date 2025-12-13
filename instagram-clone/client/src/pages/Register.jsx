import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    profilePicture: null
  });
  const [preview, setPreview] = useState(null);
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
    if (e.target.name === 'profilePicture') {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        profilePicture: file
      });
      
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submitData = new FormData();
    submitData.append('username', formData.username);
    submitData.append('email', formData.email);
    submitData.append('password', formData.password);
    submitData.append('fullName', formData.fullName);
    
    if (formData.profilePicture) {
      submitData.append('profilePicture', formData.profilePicture);
    }

    const result = await register(submitData);
    if (result.success) {
      navigate('/', { replace: true });
    }
  };

  if (loading) {
    return (
      <div className="auth-container">
        <Loader />
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo-text">Instagram</div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-center">
            <div className="mb-2">
              {preview ? (
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="profile-picture-large"
                />
              ) : (
                <div
                  className="profile-picture-large d-flex align-items-center justify-content-center"
                  style={{ backgroundColor: 'var(--bg-secondary)' }}
                >
                  <i className="bi bi-person-plus" style={{ fontSize: '48px' }}></i>
                </div>
              )}
            </div>
            <input
              type="file"
              className="form-control form-control-instagram"
              name="profilePicture"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control form-control-instagram"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control form-control-instagram"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control form-control-instagram"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control form-control-instagram"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>

          <button
            type="submit"
            className="btn btn-instagram w-100 mb-3"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center">
          <span className="text-muted-instagram">Have an account? </span>
          <Link to="/login" className="text-decoration-none fw-bold">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
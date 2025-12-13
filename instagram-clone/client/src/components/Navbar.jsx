import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-instagram d-lg-none">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <div className="logo-text" style={{ fontSize: '32px', margin: 0 }}>
            Instagram
          </div>
        </Link>

        <div className="d-flex align-items-center">
          <button
            className="btn btn-link text-decoration-none me-3"
            onClick={toggleTheme}
          >
            <i className={`bi ${isDark ? 'bi-sun' : 'bi-moon'}`}></i>
          </button>

          <div className="dropdown">
            <button
              className="btn btn-link p-0"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img
                src={user?.profilePicture}
                alt={user?.username}
                className="profile-picture"
              />
            </button>

            {showDropdown && (
              <div className="dropdown-menu dropdown-menu-end show">
                <Link className="dropdown-item" to={`/profile/${user?.username}`}>
                  <i className="bi bi-person me-2"></i>
                  Profile
                </Link>
                <Link className="dropdown-item" to="/create">
                  <i className="bi bi-plus-square me-2"></i>
                  Create Post
                </Link>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
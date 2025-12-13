import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className="sidebar-instagram d-none d-lg-block">
      <div className="px-3">
        <Link to="/" className="text-decoration-none">
          <div className="logo-text mb-4">Instagram</div>
        </Link>

        <ul className="sidebar-nav">
          <li>
            <Link to="/" className={isActive('/')}>
              <i className="bi bi-house-door"></i>
              Home
            </Link>
          </li>
          <li>
            <Link to="/explore" className={isActive('/explore')}>
              <i className="bi bi-compass"></i>
              Explore
            </Link>
          </li>
          <li>
            <Link to="/create" className={isActive('/create')}>
              <i className="bi bi-plus-square"></i>
              Create
            </Link>
          </li>
          <li>
            <Link to={`/profile/${user?.username}`} className={isActive(`/profile/${user?.username}`)}>
              <i className="bi bi-person"></i>
              Profile
            </Link>
          </li>
        </ul>

        <div className="mt-auto pt-4">
          <ul className="sidebar-nav">
            <li>
              <button
                className="btn btn-link text-decoration-none w-100 text-start"
                onClick={toggleTheme}
                style={{ color: 'var(--text-primary)' }}
              >
                <i className={`bi ${isDark ? 'bi-sun' : 'bi-moon'}`}></i>
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </button>
            </li>
            <li>
              <button
                className="btn btn-link text-decoration-none w-100 text-start"
                onClick={handleLogout}
                style={{ color: 'var(--text-primary)' }}
              >
                <i className="bi bi-box-arrow-right"></i>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
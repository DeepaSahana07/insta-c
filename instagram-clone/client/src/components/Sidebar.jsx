import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  if (!user) return null;

  return (
    <div className="sidebar-instagram d-none d-lg-block">
      <Link to="/home" className="logo-instagram">
        Instagram
      </Link>

      <ul className="sidebar-nav">
        <li>
          <Link to="/home" className={isActive('/home')}>
            <i className={`bi ${location.pathname === '/home' ? 'bi-house-door-fill' : 'bi-house-door'}`}></i>
            Home
          </Link>
        </li>
        <li>
          <Link to="/search" className={isActive('/search')}>
            <i className="bi bi-search"></i>
            Search
          </Link>
        </li>
        <li>
          <Link to="/explore" className={isActive('/explore')}>
            <i className={`bi ${location.pathname === '/explore' ? 'bi-compass-fill' : 'bi-compass'}`}></i>
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
          <Link to="/profile" className={isActive('/profile')}>
            <img src={user.profilePicture || '/src/assets/user1.jpg'} alt="Profile" className="rounded-circle" style={{width: '24px', height: '24px', marginRight: '16px'}} />
            Profile
          </Link>
        </li>
      </ul>

      <div className="mt-auto">
        <ul className="sidebar-nav">
          <li>
            <button
              className="btn btn-link text-decoration-none w-100 text-start d-flex align-items-center"
              onClick={() => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                document.documentElement.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
              }}
              style={{ color: 'var(--text-primary)', padding: '12px 16px', borderRadius: '8px' }}
            >
              <i className="bi bi-moon" style={{fontSize: '24px', marginRight: '16px', width: '24px'}}></i>
              Switch Theme
            </button>
          </li>
          <li>
            <button
              className="btn btn-link text-decoration-none w-100 text-start d-flex align-items-center"
              onClick={handleLogout}
              style={{ color: 'var(--text-primary)', padding: '12px 16px', borderRadius: '8px' }}
            >
              <i className="bi bi-box-arrow-right" style={{fontSize: '24px', marginRight: '16px', width: '24px'}}></i>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
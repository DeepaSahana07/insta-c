import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { currentUser } from '../services/fakeData';

const Sidebar = () => {
  const { logout } = useAuth();
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
      <Link to="/" className="logo-instagram">
        Instagram
      </Link>

      <ul className="sidebar-nav">
        <li>
          <Link to="/" className={isActive('/')}>
            <i className={`bi ${location.pathname === '/' ? 'bi-house-door-fill' : 'bi-house-door'}`}></i>
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
          <Link to="/reels" className={isActive('/reels')}>
            <i className="bi bi-camera-reels"></i>
            Reels
          </Link>
        </li>
        <li>
          <Link to="/messages" className={isActive('/messages')}>
            <i className={`bi ${location.pathname === '/messages' ? 'bi-chat-fill' : 'bi-chat'}`}></i>
            Messages
            <span className="badge bg-danger rounded-pill ms-auto" style={{fontSize: '11px'}}>5</span>
          </Link>
        </li>
        <li>
          <Link to="/notifications" className={isActive('/notifications')}>
            <i className={`bi ${location.pathname === '/notifications' ? 'bi-heart-fill' : 'bi-heart'}`}></i>
            Notifications
          </Link>
        </li>
        <li>
          <Link to="/create" className={isActive('/create')}>
            <i className="bi bi-plus-square"></i>
            Create
          </Link>
        </li>
        <li>
          <Link to={`/profile/${currentUser.username}`} className={isActive(`/profile/${currentUser.username}`)}>
            <img src={currentUser.profilePicture} alt="Profile" className="rounded-circle" style={{width: '24px', height: '24px', marginRight: '16px'}} />
            Profile
          </Link>
        </li>
      </ul>

      <div className="mt-auto">
        <ul className="sidebar-nav">
          <li>
            <Link to="/more" className={isActive('/more')}>
              <i className="bi bi-list"></i>
              More
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
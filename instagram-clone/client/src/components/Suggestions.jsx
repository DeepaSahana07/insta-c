import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { currentUser, suggestedUsers } from '../services/fakeData';
import freeApiService from '../services/freeApiService';

const Suggestions = () => {
  const [followingStatus, setFollowingStatus] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const apiUsers = await freeApiService.getUsers(5);
        setUsers(apiUsers);
      } catch (error) {
        setUsers(suggestedUsers);
      }
    };
    fetchUsers();
  }, []);

  const handleFollow = async (userId) => {
    try {
      await freeApiService.followUser(userId);
      setFollowingStatus(prev => ({
        ...prev,
        [userId]: !prev[userId]
      }));
    } catch (error) {
      console.log('Follow action failed');
    }
  };

  return (
    <div className="suggestions-container">
      {/* Current User Info */}
      <div className="user-info-card">
        <Link to={`/profile/${currentUser.username}`}>
          <img
            src={currentUser.profilePicture}
            alt={currentUser.username}
            className="user-info-avatar"
          />
        </Link>
        <div className="user-info-details flex-grow-1">
          <h6>{currentUser.username}</h6>
          <p>{currentUser.fullName}</p>
        </div>
        <button className="btn btn-link p-0 text-decoration-none fw-bold" style={{color: 'var(--primary-color)', fontSize: '12px'}}>
          Switch
        </button>
      </div>

      {/* Suggestions */}
      <div className="suggestions-header">
        <h6 className="suggestions-title">Suggested for you</h6>
        <Link to="/explore/people" className="see-all-btn">See All</Link>
      </div>

      {users.map((user) => (
        <div key={user.id} className="suggestion-item">
          <div className="suggestion-user">
            <Link to={`/profile/${user.username}`}>
              <img
                src={user.avatar || user.profilePicture || '/src/assets/user1.jpg'}
                alt={user.username}
                className="suggestion-avatar"
              />
            </Link>
            <div className="suggestion-info">
              <h6>
                {user.username}
                {user.isVerified && (
                  <i className="bi bi-patch-check-fill text-primary ms-1" style={{fontSize: '12px'}}></i>
                )}
              </h6>
              <p>Followed by {user.mutualFollowers?.[0] || 'friends'} + {Math.floor(Math.random() * 10)} more</p>
            </div>
          </div>
          <button
            className="follow-btn"
            onClick={() => handleFollow(user.id)}
          >
            {followingStatus[user.id] ? 'Following' : 'Follow'}
          </button>
        </div>
      ))}

      {/* Footer Links */}
      <div className="footer-links">
        <a href="#">About</a> · <a href="#">Help</a> · <a href="#">Press</a> · <a href="#">API</a> · <a href="#">Jobs</a> · <a href="#">Privacy</a> · <a href="#">Terms</a> · <a href="#">Locations</a> · <a href="#">Language</a> · <a href="#">Meta Verified</a>
      </div>

      <div className="footer-copyright">
        © 2025 INSTAGRAM FROM META
      </div>
    </div>
  );
};

export default Suggestions;
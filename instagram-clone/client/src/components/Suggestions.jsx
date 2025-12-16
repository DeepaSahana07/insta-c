import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';
import SwitchAccountModal from './SwitchAccountModal';

const Suggestions = () => {
  const { user, login, updateUserCounts } = useAuth();
  const [followingStatus, setFollowingStatus] = useState({});
  const [users, setUsers] = useState([]);
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Get both suggested users and additional demo users
        const [suggestedResponse, demoResponse] = await Promise.allSettled([
          apiService.getSuggestedUsers(),
          apiService.getDemoUsers()
        ]);
        
        const suggestedUsers = suggestedResponse.status === 'fulfilled' 
          ? suggestedResponse.value.data.users || []
          : [];
          
        const demoUsers = demoResponse.status === 'fulfilled'
          ? demoResponse.value.data || []
          : [];
        
        // Generate additional demo users if needed
        const aestheticUsernames = [
          'wanderlust_soul', 'coffee_vibes', 'sunset_chaser', 'ocean_dreams', 'city_lights',
          'nature_lover', 'art_enthusiast', 'foodie_adventures', 'travel_diaries', 'creative_mind',
          'golden_hour', 'street_photographer', 'minimalist_life', 'vintage_soul', 'modern_nomad'
        ];
        
        const fullNames = [
          'Emma Johnson', 'Alex Rivera', 'Maya Patel', 'Jordan Smith', 'Zoe Chen',
          'Lucas Brown', 'Aria Wilson', 'Noah Davis', 'Luna Garcia', 'Kai Thompson',
          'Sage Martinez', 'River Jones', 'Phoenix Lee', 'Sky Anderson', 'Indie Taylor'
        ];
        
        const additionalUsers = [];
        for (let i = 0; i < 10; i++) {
          additionalUsers.push({
            id: `demo-${i}`,
            _id: `demo-${i}`,
            username: aestheticUsernames[i],
            fullName: fullNames[i],
            profilePicture: `https://i.pravatar.cc/150?img=${i + 20}`,
            avatar: `https://i.pravatar.cc/150?img=${i + 20}`,
            mutualFollowers: [`friend${i}`, `buddy${i}`],
            isVerified: Math.random() > 0.8
          });
        }
        
        // Combine and filter out current user
        const allUsers = [...suggestedUsers, ...demoUsers, ...additionalUsers]
          .filter(u => u._id !== user?.id && u.id !== user?.id)
          .slice(0, 15);
        
        setUsers(allUsers);
        
        // Initialize following status for fetched users
        const initialStatus = {};
        allUsers.forEach(u => {
          initialStatus[u.id || u._id] = false;
        });
        setFollowingStatus(initialStatus);
      } catch (error) {
        console.error('Failed to fetch suggested users:', error);
        setUsers([]);
      }
    };
    
    if (user) {
      fetchUsers();
    }
  }, [user]);

  const handleFollow = async (userId) => {
    try {
      const response = await apiService.followUser(userId);
      
      if (response.data.success) {
        setFollowingStatus(prev => ({
          ...prev,
          [userId]: response.data.isFollowing
        }));
        
        // Update current user's following count from backend response
        if (response.data.currentUserFollowingCount !== undefined) {
          updateUserCounts({ followingCount: response.data.currentUserFollowingCount });
        }
      }
    } catch (error) {
      console.log('Follow action failed:', error);
    }
  };

  return (
    <div className="suggestions-container">
      {/* Current User Info */}
      {user && (
        <div className="user-info-card">
          <Link to={`/profile/${user.username}`}>
            <img
              src={user.profilePicture || '/src/assets/user1.jpg'}
              alt={user.username}
              className="user-info-avatar"
            />
          </Link>
          <div className="user-info-details flex-grow-1">
            <h6 className="text-gray-900 dark:text-white">{user.username}</h6>
            <p className="text-gray-600 dark:text-gray-300">{user.fullName}</p>
          </div>
          <button 
            className="btn btn-link p-0 text-decoration-none fw-bold" 
            style={{color: 'var(--primary-color)', fontSize: '12px'}}
            onClick={() => setShowSwitchModal(true)}
          >
            Switch
          </button>
        </div>
      )}

      {/* Suggestions */}
      <div className="suggestions-header">
        <h6 className="suggestions-title text-gray-900 dark:text-white">Suggested for you</h6>
        <Link to="/explore/people" className="see-all-btn text-blue-500 dark:text-blue-400">See All</Link>
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
              <h6 className="text-gray-900 dark:text-white">
                {user.username}
                {user.isVerified && (
                  <i className="bi bi-patch-check-fill text-primary ms-1" style={{fontSize: '12px'}}></i>
                )}
              </h6>
              <p className="text-gray-600 dark:text-gray-300">Followed by {user.mutualFollowers?.[0] || 'friends'} + {Math.floor(Math.random() * 10)} more</p>
            </div>
          </div>
          <button
            className="follow-btn"
            onClick={() => handleFollow(user.id || user._id)}
            style={{
              backgroundColor: '#0095f6',
              color: 'white',
              border: 'none',
              padding: '6px 16px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            {followingStatus[user.id || user._id] ? 'Following' : 'Follow'}
          </button>
        </div>
      ))}

      {/* Footer Links */}
      <div className="footer-links text-gray-500 dark:text-gray-400">
        <a href="#" className="text-gray-500 dark:text-gray-400">About</a> · <a href="#" className="text-gray-500 dark:text-gray-400">Help</a> · <a href="#" className="text-gray-500 dark:text-gray-400">Press</a> · <a href="#" className="text-gray-500 dark:text-gray-400">API</a> · <a href="#" className="text-gray-500 dark:text-gray-400">Jobs</a> · <a href="#" className="text-gray-500 dark:text-gray-400">Privacy</a> · <a href="#" className="text-gray-500 dark:text-gray-400">Terms</a> · <a href="#" className="text-gray-500 dark:text-gray-400">Locations</a> · <a href="#" className="text-gray-500 dark:text-gray-400">Language</a> · <a href="#" className="text-gray-500 dark:text-gray-400">Meta Verified</a>
      </div>

      <div className="footer-copyright text-gray-500 dark:text-gray-400">
        © 2025 INSTAGRAM FROM META
      </div>
      
      <SwitchAccountModal 
        isOpen={showSwitchModal} 
        onClose={() => setShowSwitchModal(false)} 
      />
    </div>
  );
};

export default Suggestions;
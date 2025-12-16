import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';

const Profile = () => {
  const { username } = useParams();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, [username, currentUser]);

  const fetchUserProfile = async () => {
    try {
      const targetUsername = username || currentUser?.username;
      
      if (!targetUsername) {
        setUser(null);
        setPosts([]);
        setLoading(false);
        return;
      }
      
      // Always fetch from backend to ensure data consistency
      const response = await apiService.getUserProfile(targetUsername);
      
      if (response.data.success) {
        setUser(response.data.user);
        setPosts(response.data.user.posts || []);
      } else {
        setUser(null);
        setPosts([]);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUser(null);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }
    
    const confirmText = prompt('Type "DELETE" to confirm account deletion:');
    if (confirmText !== 'DELETE') {
      alert('Account deletion cancelled.');
      return;
    }
    
    try {
      const response = await apiService.deleteAccount();
      
      if (response.data.success) {
        alert('Account deleted successfully.');
        localStorage.clear();
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Delete account failed:', error);
      alert('Failed to delete account. Please try again.');
    }
  };
  
  if (loading) {
    return <div className="main-content">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="main-content">
        <div className="text-center py-5">
          <h3 className="text-gray-900 dark:text-white">User not found</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="container" style={{ maxWidth: '935px', margin: '0 auto', padding: '20px' }}>
        {/* Profile Header */}
        <div className="d-flex align-items-center mb-5" style={{ padding: '30px 0' }}>
          <img
            src={user.profilePicture || '/src/assets/user1.jpg'}
            alt={user.username}
            className="rounded-circle me-4"
            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
          />
          <div>
            <h2 className="mb-2 text-gray-900 dark:text-white" style={{ fontSize: '28px', fontWeight: '300' }}>{user.username}</h2>
            <h4 className="mb-3 text-gray-900 dark:text-white" style={{ fontSize: '16px', fontWeight: '600' }}>{user.fullName}</h4>
            <div className="d-flex gap-4 mb-3">
              <span className="text-gray-900 dark:text-white"><strong>{user.postsCount || posts.length}</strong> posts</span>
              <span className="text-gray-900 dark:text-white"><strong>{user.followersCount || user.followers?.length || 0}</strong> followers</span>
              <span className="text-gray-900 dark:text-white"><strong>{user.followingCount || user.following?.length || 0}</strong> following</span>
            </div>
            
            {(user._id === currentUser?.id || user.username === currentUser?.username) && (
              <button
                onClick={handleDeleteAccount}
                style={{
                  background: '#ed4956',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  marginTop: '10px'
                }}
              >
                Delete Account
              </button>
            )}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="row">
          {posts.length === 0 ? (
            <div className="col-12 text-center py-5">
              <i className="bi bi-camera text-gray-500 dark:text-gray-400" style={{ fontSize: '64px' }}></i>
              <h3 className="mt-3 text-gray-900 dark:text-white">No posts yet</h3>
            </div>
          ) : (
            posts.map(post => (
              <div key={post.id} className="col-md-4 mb-3">
                <div className="position-relative">
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-100"
                    style={{
                      aspectRatio: '1',
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                  />
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                    style={{
                      background: 'rgba(0,0,0,0.5)',
                      opacity: 0,
                      transition: 'opacity 0.2s ease',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = 1}
                    onMouseLeave={(e) => e.target.style.opacity = 0}
                  >
                    <div className="text-white d-flex align-items-center">
                      <i className="bi bi-heart-fill me-2"></i>
                      {post.likes || 0}
                      <i className="bi bi-chat-fill ms-4 me-2"></i>
                      {post.comments?.length || 0}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfileCard from '../components/ProfileCard';
import Loader from '../components/Loader';
import api from '../services/api';

const Profile = () => {
  const { username } = useParams();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, [username]);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get(`/users/profile/${username}`);
      setUser(response.data.user);
      setPosts(response.data.user.posts || []);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = () => {
    fetchUserProfile();
  };

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return (
      <div className="text-center py-5">
        <h3>User not found</h3>
      </div>
    );
  }

  return (
    <div className="container">
      <ProfileCard user={user} onUpdate={handleUpdate} />

      {/* Posts Grid */}
      <div className="row">
        {posts.length === 0 ? (
          <div className="col-12 text-center py-5">
            <i className="bi bi-camera" style={{ fontSize: '64px', color: 'var(--text-secondary)' }}></i>
            <h3 className="mt-3 text-muted-instagram">No posts yet</h3>
            {user._id === currentUser?.id && (
              <p className="text-muted-instagram">Share your first photo to get started</p>
            )}
          </div>
        ) : (
          posts.map(post => (
            <div key={post._id} className="col-md-4 mb-4">
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
                    {post.likes?.length || 0}
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
  );
};

export default Profile;
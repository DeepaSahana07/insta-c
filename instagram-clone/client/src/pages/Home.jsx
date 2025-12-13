import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Post from '../components/Post';
import Story from '../components/Story';
import Loader from '../components/Loader';
import api from '../services/api';

const Home = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedPosts();
    fetchSuggestedUsers();
  }, []);

  const fetchFeedPosts = async () => {
    try {
      const response = await api.get('/posts/feed');
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching feed posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSuggestedUsers = async () => {
    try {
      const response = await api.get('/users/suggested');
      setSuggestedUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching suggested users:', error);
    }
  };

  const handlePostUpdate = () => {
    fetchFeedPosts();
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-8">
          {/* Stories Section */}
          <div className="card-instagram p-3 mb-4">
            <div className="d-flex overflow-auto">
              <Story user={user} isOwn={true} />
              {suggestedUsers.slice(0, 6).map(suggestedUser => (
                <Story key={suggestedUser._id} user={suggestedUser} />
              ))}
            </div>
          </div>

          {/* Posts Feed */}
          {posts.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-camera" style={{ fontSize: '64px', color: 'var(--text-secondary)' }}></i>
              <h3 className="mt-3 text-muted-instagram">No posts yet</h3>
              <p className="text-muted-instagram">Follow some users to see their posts in your feed</p>
            </div>
          ) : (
            posts.map(post => (
              <Post
                key={post._id}
                post={post}
                onUpdate={handlePostUpdate}
              />
            ))
          )}
        </div>

        {/* Sidebar */}
        <div className="col-lg-4 d-none d-lg-block">
          <div className="sticky-top" style={{ top: '20px' }}>
            {/* User Info */}
            <div className="card-instagram p-3 mb-4">
              <div className="d-flex align-items-center">
                <img
                  src={user?.profilePicture}
                  alt={user?.username}
                  className="profile-picture me-3"
                />
                <div>
                  <div className="fw-bold">{user?.username}</div>
                  <div className="text-muted-instagram">{user?.fullName}</div>
                </div>
              </div>
            </div>

            {/* Suggested Users */}
            {suggestedUsers.length > 0 && (
              <div className="card-instagram p-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="mb-0 text-muted-instagram">Suggestions for you</h6>
                </div>
                {suggestedUsers.slice(0, 5).map(suggestedUser => (
                  <div key={suggestedUser._id} className="d-flex align-items-center justify-content-between mb-3">
                    <div className="d-flex align-items-center">
                      <img
                        src={suggestedUser.profilePicture}
                        alt={suggestedUser.username}
                        className="profile-picture me-3"
                        style={{ width: '32px', height: '32px' }}
                      />
                      <div>
                        <div className="fw-bold small">{suggestedUser.username}</div>
                        <div className="text-muted-instagram small">{suggestedUser.fullName}</div>
                      </div>
                    </div>
                    <button className="btn btn-link p-0 text-decoration-none fw-bold small">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
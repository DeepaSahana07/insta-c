import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import api from '../services/api';

const Explore = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExplorePosts();
  }, []);

  const fetchExplorePosts = async () => {
    try {
      const response = await api.get('/posts/explore');
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching explore posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <h2 className="mb-4">Explore</h2>
      
      {posts.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-compass" style={{ fontSize: '64px', color: 'var(--text-secondary)' }}></i>
          <h3 className="mt-3 text-muted-instagram">No posts to explore</h3>
          <p className="text-muted-instagram">Check back later for new content</p>
        </div>
      ) : (
        <div className="row">
          {posts.map(post => (
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
                
                {/* User info overlay */}
                <div className="position-absolute bottom-0 start-0 p-2">
                  <div className="d-flex align-items-center">
                    <img
                      src={post.user.profilePicture}
                      alt={post.user.username}
                      className="rounded-circle me-2"
                      style={{ width: '24px', height: '24px' }}
                    />
                    <small className="text-white fw-bold">{post.user.username}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Explore;
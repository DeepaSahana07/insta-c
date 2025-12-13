import React from 'react';
import { fakePosts } from '../services/fakeData';

const Explore = () => {
  return (
    <div className="main-content">
      <div className="feed-container">
        <div className="explore-grid">
          {fakePosts.map(post => (
            <div key={post.id} className="explore-item">
              <img
                src={post.image}
                alt="Post"
                className="explore-image"
              />
              <div className="explore-overlay">
                <div className="explore-stats">
                  <span>
                    <i className="bi bi-heart-fill me-1"></i>
                    {post.likes}
                  </span>
                  <span className="ms-3">
                    <i className="bi bi-chat-fill me-1"></i>
                    {post.comments.length}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
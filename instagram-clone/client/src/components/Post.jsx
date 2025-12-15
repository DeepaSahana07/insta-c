import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import freeApiService from '../services/freeApiService';

const Post = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes || 0);
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleLike = async () => {
    try {
      await freeApiService.likePost(post.id);
      setIsLiked(!isLiked);
      setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    } catch (error) {
      console.log('Like action failed');
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    // Add comment logic here
    setComment('');
  };

  return (
    <div className="post-card">
      {/* Post Header */}
      <div className="post-header">
        <div className="post-user-info">
          <Link to={`/profile/${post.user.username}`}>
            <img
              src={post.user.avatar || post.user.profilePicture || '/src/assets/user1.jpg'}
              alt={post.user.username}
              className="post-avatar"
            />
          </Link>
          <div>
            <Link to={`/profile/${post.user.username}`} className="post-username">
              {post.user.username}
            </Link>
            {post.location && (
              <div className="post-location">{post.location}</div>
            )}
          </div>
        </div>
        <button className="post-options">
          <i className="bi bi-three-dots"></i>
        </button>
      </div>

      {/* Post Image */}
      <img src={post.image} alt="Post" className="post-image" />

      {/* Post Actions */}
      <div className="post-actions">
        <div className="post-actions-left">
          <button className={`action-btn ${isLiked ? 'liked' : ''}`} onClick={handleLike}>
            <i className={`bi ${isLiked ? 'bi-heart-fill' : 'bi-heart'}`}></i>
          </button>
          <button className="action-btn">
            <i className="bi bi-chat"></i>
          </button>
          <button className="action-btn">
            <i className="bi bi-send"></i>
          </button>
        </div>
        <button className={`action-btn ${isSaved ? 'saved' : ''}`} onClick={handleSave}>
          <i className={`bi ${isSaved ? 'bi-bookmark-fill' : 'bi-bookmark'}`}></i>
        </button>
      </div>

      {/* Post Likes */}
      {likesCount > 0 && (
        <div className="post-likes">
          {likesCount.toLocaleString()} likes
        </div>
      )}

      {/* Post Caption */}
      {post.caption && (
        <div className="post-caption">
          <Link to={`/profile/${post.user.username}`} className="post-caption-username">
            {post.user.username}
          </Link>
          {post.caption}
        </div>
      )}

      {/* Post Comments */}
      <div className="post-comments">
        {post.comments && post.comments.length > 2 && (
          <button className="view-comments" onClick={() => setShowComments(!showComments)}>
            View all {post.comments.length} comments
          </button>
        )}
        
        {post.comments && (showComments ? post.comments : post.comments.slice(-2)).map((comment) => (
          <div key={comment.id} className="post-comment">
            <Link to={`/profile/${comment.user?.username || 'user'}`} className="comment-username">
              {comment.user?.username || 'user'}
            </Link>
            {comment.text}
          </div>
        ))}
      </div>

      {/* Post Time */}
      <div className="post-time">
        {post.timestamp ? new Date(post.timestamp).toLocaleDateString() : post.createdAt || '1 day ago'}
      </div>

      {/* Comment Input */}
      <div className="comment-input-container">
        <button className="action-btn">
          <i className="bi bi-emoji-smile"></i>
        </button>
        <input
          type="text"
          className="comment-input"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {comment.trim() && (
          <button className="comment-post-btn" onClick={handleComment}>
            Post
          </button>
        )}
      </div>
    </div>
  );
};

export default Post;
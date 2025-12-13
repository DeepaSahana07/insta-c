import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Post = ({ post, onUpdate }) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(post.likes.some(like => like._id === user?.id));
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(post.comments || []);
  const [showComments, setShowComments] = useState(false);

  const handleLike = async () => {
    try {
      const response = await api.post(`/posts/${post._id}/like`);
      setIsLiked(response.data.isLiked);
      setLikesCount(response.data.likesCount);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const response = await api.post(`/posts/${post._id}/comment`, {
        text: comment
      });
      setComments([...comments, response.data.comment]);
      setComment('');
    } catch (error) {
      console.error('Error commenting:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await api.delete(`/posts/${post._id}`);
        if (onUpdate) onUpdate();
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="post-card">
      {/* Post Header */}
      <div className="post-header">
        <div className="d-flex align-items-center">
          <Link to={`/profile/${post.user.username}`} className="text-decoration-none">
            <img
              src={post.user.profilePicture}
              alt={post.user.username}
              className="profile-picture me-3"
            />
          </Link>
          <div>
            <Link
              to={`/profile/${post.user.username}`}
              className="text-decoration-none fw-bold"
              style={{ color: 'var(--text-primary)' }}
            >
              {post.user.username}
            </Link>
            {post.location && (
              <div className="text-muted-instagram small">{post.location}</div>
            )}
          </div>
        </div>
        {post.user._id === user?.id && (
          <div className="dropdown">
            <button
              className="btn btn-link text-decoration-none"
              data-bs-toggle="dropdown"
            >
              <i className="bi bi-three-dots"></i>
            </button>
            <ul className="dropdown-menu">
              <li>
                <button className="dropdown-item text-danger" onClick={handleDelete}>
                  Delete Post
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Post Image */}
      <img src={post.image} alt="Post" className="post-image" />

      {/* Post Actions */}
      <div className="post-actions">
        <div className="d-flex align-items-center">
          <button
            className={`like-button me-3 ${isLiked ? 'liked' : ''}`}
            onClick={handleLike}
          >
            <i className={`bi ${isLiked ? 'bi-heart-fill' : 'bi-heart'}`}></i>
          </button>
          <button
            className="like-button me-3"
            onClick={() => setShowComments(!showComments)}
          >
            <i className="bi bi-chat"></i>
          </button>
        </div>
      </div>

      {/* Post Info */}
      <div className="post-info">
        {likesCount > 0 && (
          <div className="fw-bold mb-1">
            {likesCount} {likesCount === 1 ? 'like' : 'likes'}
          </div>
        )}

        {post.caption && (
          <div className="mb-2">
            <Link
              to={`/profile/${post.user.username}`}
              className="text-decoration-none fw-bold me-2"
              style={{ color: 'var(--text-primary)' }}
            >
              {post.user.username}
            </Link>
            {post.caption}
          </div>
        )}

        {comments.length > 0 && !showComments && (
          <button
            className="btn btn-link p-0 text-muted-instagram text-decoration-none"
            onClick={() => setShowComments(true)}
          >
            View all {comments.length} comments
          </button>
        )}

        {showComments && (
          <div className="comments-section">
            {comments.slice(-3).map((comment, index) => (
              <div key={index} className="mb-1">
                <Link
                  to={`/profile/${comment.user.username}`}
                  className="text-decoration-none fw-bold me-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {comment.user.username}
                </Link>
                {comment.text}
              </div>
            ))}
          </div>
        )}

        <div className="text-muted-instagram small mb-2">
          {formatDate(post.createdAt)}
        </div>

        {/* Comment Input */}
        <form onSubmit={handleComment} className="d-flex align-items-center border-top pt-3">
          <input
            type="text"
            className="comment-input"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {comment.trim() && (
            <button
              type="submit"
              className="btn btn-link p-0 text-decoration-none fw-bold"
              style={{ color: 'var(--primary-color)' }}
            >
              Post
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Post;
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';

const Post = ({ post }) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(() => {
    return Array.isArray(post.likes) ? post.likes.includes(user?.id) : false;
  });
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(Array.isArray(post.likes) ? post.likes.length : (post.likes || 0));
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(Array.isArray(post.comments) ? post.comments : []);

  const handleLike = async () => {
    try {
      // For demo posts, handle locally
      if (post.id && typeof post.id === 'string' && (post.id.startsWith('demo-') || post.id.startsWith('extra-') || post.id.startsWith('explore-'))) {
        const newIsLiked = !isLiked;
        const newCount = newIsLiked ? likesCount + 1 : Math.max(0, likesCount - 1);
        setIsLiked(newIsLiked);
        setLikesCount(newCount);
        return;
      }
      
      // For real posts, use API
      const response = await apiService.likePost(post._id || post.id);
      
      if (response.data.success) {
        setIsLiked(response.data.isLiked);
        setLikesCount(response.data.likesCount);
      }
    } catch (error) {
      // Fallback to local handling if API fails
      const newIsLiked = !isLiked;
      const newCount = newIsLiked ? likesCount + 1 : Math.max(0, likesCount - 1);
      setIsLiked(newIsLiked);
      setLikesCount(newCount);
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim() || !user) return;
    
    try {
      // For demo posts, handle locally
      if (post.id && typeof post.id === 'string' && (post.id.startsWith('demo-') || post.id.startsWith('extra-') || post.id.startsWith('explore-'))) {
        const newComment = {
          id: Date.now(),
          text: comment,
          user: {
            username: user.username,
            profilePicture: user.profilePicture
          },
          createdAt: 'now'
        };
        setComments([...comments, newComment]);
        setComment('');
        return;
      }
      
      // For real posts, use API
      const response = await apiService.commentOnPost(post._id || post.id, comment);
      
      if (response.data.success) {
        setComments([...comments, response.data.comment]);
        setComment('');
      }
    } catch (error) {
      // Fallback to local handling if API fails
      const newComment = {
        id: Date.now(),
        text: comment,
        user: {
          username: user.username,
          profilePicture: user.profilePicture
        },
        createdAt: 'now'
      };
      setComments([...comments, newComment]);
      setComment('');
    }
  };
  
  const handleDeletePost = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    try {
      const response = await apiService.deletePost(post._id || post.id);
      
      if (response.data.success) {
        window.location.reload();
      }
    } catch (error) {
      console.log('Delete post failed:', error);
      alert('Failed to delete post. You can only delete your own posts.');
    }
  };

  return (
    <div className="post-card">
      {/* Post Header */}
      <div className="post-header">
        <div className="post-user-info">
          <img
            src={post.user.avatar || post.user.profilePicture || '/src/assets/user1.jpg'}
            alt={post.user.username}
            className="post-avatar"
          />
          <div>
            <span className="post-username text-gray-900 dark:text-white">
              {post.user.username}
            </span>
            {post.location && (
              <div className="post-location text-gray-600 dark:text-gray-300">{post.location}</div>
            )}
          </div>
        </div>
        {(post.user._id === user?.id || post.user.id === user?.id) && (
          <button 
            className="post-options"
            onClick={() => handleDeletePost()}
            style={{ color: '#ed4956' }}
          >
            <i className="bi bi-trash"></i>
          </button>
        )}
      </div>

      {/* Post Image */}
      <img src={post.image} alt="Post" className="post-image" />

      {/* Post Actions */}
      <div className="post-actions">
        <div className="post-actions-left">
          <button className={`action-btn ${isLiked ? 'liked' : ''}`} onClick={handleLike}>
            <i className={`bi ${isLiked ? 'bi-heart-fill' : 'bi-heart'}`} style={{ color: isLiked ? '#ed4956' : 'inherit' }}></i>
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
        <div className="post-likes text-gray-900 dark:text-white">
          {likesCount.toLocaleString()} likes
        </div>
      )}

      {/* Post Caption */}
      {post.caption && (
        <div className="post-caption text-gray-900 dark:text-white">
          <span className="post-caption-username font-semibold">
            {post.user.username}
          </span>
          {' '}{post.caption}
        </div>
      )}

      {/* Post Comments */}
      <div className="post-comments">
        {comments && comments.length > 2 && (
          <button className="view-comments text-gray-600 dark:text-gray-300" onClick={() => setShowComments(!showComments)}>
            View all {comments.length} comments
          </button>
        )}
        
        {Array.isArray(comments) && (showComments ? comments : comments.slice(-2)).map((comment) => (
          <div key={comment.id} className="post-comment text-gray-900 dark:text-white">
            <span className="comment-username font-semibold">
              {comment.user?.username || 'user'}
            </span>
            {' '}{comment.text}
          </div>
        ))}
      </div>

      {/* Post Time */}
      <div className="post-time text-gray-500 dark:text-gray-400">
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
          <button className="comment-post-btn text-blue-500 dark:text-blue-400" onClick={handleComment}>
            Post
          </button>
        )}
      </div>
    </div>
  );
};

export default Post;
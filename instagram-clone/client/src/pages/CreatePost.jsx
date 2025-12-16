import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';

const CreatePost = () => {
  const { user, updateUserCounts } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    imageUrl: '',
    caption: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.imageUrl) {
      setError('Please enter an image URL');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (!user) {
        setError('Please log in to create a post');
        return;
      }

      // Create post via backend API
      const postData = {
        imageUrl: formData.imageUrl,
        caption: formData.caption,
        location: formData.location
      };
      
      const response = await apiService.createPost(postData);
      
      if (response.data.success) {
        // Update user's post count
        const newPostsCount = (user.postsCount || 0) + 1;
        updateUserCounts({ postsCount: newPostsCount });
      }

      navigate('/home');
    } catch (error) {
      setError('Error creating post: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <div className="create-post-container max-w-4xl mx-auto px-4">
        <div className="create-post-card">
          <h2 className="create-post-title text-gray-900 dark:text-white">Create New Post</h2>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="create-post-form">
            {/* Image URL */}
            <div className="form-group">
              <label className="form-label text-gray-900 dark:text-white">Image URL</label>
              <input
                type="url"
                className="location-input"
                name="imageUrl"
                placeholder="Enter image URL"
                value={formData.imageUrl}
                onChange={handleChange}
                required
              />
              {formData.imageUrl && (
                <div className="image-preview">
                  <img src={formData.imageUrl} alt="Preview" className="preview-image" onError={(e) => e.target.style.display = 'none'} />
                </div>
              )}
            </div>

            {/* Caption */}
            <div className="form-group">
              <label className="form-label text-gray-900 dark:text-white">Caption</label>
              <textarea
                className="caption-input"
                name="caption"
                rows="3"
                placeholder="Write a caption..."
                value={formData.caption}
                onChange={handleChange}
                maxLength="2200"
              />
              <div className="caption-counter text-gray-600 dark:text-gray-300">
                {formData.caption.length}/2200
              </div>
            </div>

            {/* Location */}
            <div className="form-group">
              <label className="form-label text-gray-900 dark:text-white">Location</label>
              <input
                type="text"
                className="location-input"
                name="location"
                placeholder="Add location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            {/* User Info */}
            <div className="user-preview">
              <img
                src={user?.profilePicture || '/src/assets/user1.jpg'}
                alt={user?.username}
                className="user-avatar"
              />
              <div className="user-info">
                <div className="username text-gray-900 dark:text-white">{user?.username}</div>
                <div className="fullname text-gray-600 dark:text-gray-300">{user?.fullName}</div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="share-btn"
              disabled={loading || !formData.imageUrl}
            >
              {loading ? 'Sharing...' : 'Share Post'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
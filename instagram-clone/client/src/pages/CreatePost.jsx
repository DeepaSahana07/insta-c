import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CreatePost = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    image: null,
    caption: '',
    location: ''
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file
    });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.image) {
      setError('Please select an image');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (!user) {
        setError('Please log in to create a post');
        return;
      }

      // Simulate post creation with localStorage
      const existingPosts = JSON.parse(localStorage.getItem('userPosts') || '[]');
      
      const newPost = {
        id: Date.now(),
        user: {
          id: user.id,
          username: user.username,
          name: user.fullName,
          avatar: user.profilePicture || '/src/assets/user1.jpg'
        },
        image: preview,
        caption: formData.caption,
        location: formData.location,
        likes: Math.floor(Math.random() * 100),
        comments: [],
        timestamp: new Date().toISOString(),
        liked: false,
        createdAt: 'now'
      };

      existingPosts.unshift(newPost);
      localStorage.setItem('userPosts', JSON.stringify(existingPosts));

      navigate('/');
    } catch (error) {
      setError('Error creating post: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <div className="create-post-container">
        <div className="create-post-card">
          <h2 className="create-post-title">Create New Post</h2>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="create-post-form">
            {/* Image Upload */}
            <div className="form-group">
              <label className="form-label">Select Image</label>
              <input
                type="file"
                className="file-input"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              {preview && (
                <div className="image-preview">
                  <img src={preview} alt="Preview" className="preview-image" />
                </div>
              )}
            </div>

            {/* Caption */}
            <div className="form-group">
              <label className="form-label">Caption</label>
              <textarea
                className="caption-input"
                name="caption"
                rows="3"
                placeholder="Write a caption..."
                value={formData.caption}
                onChange={handleChange}
                maxLength="2200"
              />
              <div className="caption-counter">
                {formData.caption.length}/2200
              </div>
            </div>

            {/* Location */}
            <div className="form-group">
              <label className="form-label">Location</label>
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
                <div className="username">{user?.username}</div>
                <div className="fullname">{user?.fullName}</div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="share-btn"
              disabled={loading || !formData.image}
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
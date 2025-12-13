import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

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
      const submitData = new FormData();
      submitData.append('image', formData.image);
      submitData.append('caption', formData.caption);
      submitData.append('location', formData.location);

      await api.post('/posts', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Error creating post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card-instagram p-4">
            <h2 className="mb-4">Create New Post</h2>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Image Upload */}
              <div className="mb-4">
                <label className="form-label">Select Image</label>
                <input
                  type="file"
                  className="form-control form-control-instagram"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
                {preview && (
                  <div className="mt-3">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-100"
                      style={{
                        maxHeight: '400px',
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Caption */}
              <div className="mb-3">
                <label className="form-label">Caption</label>
                <textarea
                  className="form-control form-control-instagram"
                  name="caption"
                  rows="3"
                  placeholder="Write a caption..."
                  value={formData.caption}
                  onChange={handleChange}
                  maxLength="2200"
                />
                <div className="text-muted-instagram small mt-1">
                  {formData.caption.length}/2200
                </div>
              </div>

              {/* Location */}
              <div className="mb-4">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control form-control-instagram"
                  name="location"
                  placeholder="Add location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              {/* User Info */}
              <div className="d-flex align-items-center mb-4 p-3 rounded" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <img
                  src={user?.profilePicture}
                  alt={user?.username}
                  className="profile-picture me-3"
                />
                <div>
                  <div className="fw-bold">{user?.username}</div>
                  <div className="text-muted-instagram small">{user?.fullName}</div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-instagram w-100"
                disabled={loading || !formData.image}
              >
                {loading ? 'Sharing...' : 'Share Post'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
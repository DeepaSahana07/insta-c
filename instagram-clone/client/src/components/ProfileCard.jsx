import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const ProfileCard = ({ user: profileUser, onUpdate }) => {
  const { user: currentUser } = useAuth();
  const [isFollowing, setIsFollowing] = useState(
    profileUser?.followers?.some(follower => follower._id === currentUser?.id) || false
  );
  const [followersCount, setFollowersCount] = useState(profileUser?.followers?.length || 0);

  const handleFollow = async () => {
    try {
      const response = await api.post(`/users/follow/${profileUser._id}`);
      setIsFollowing(response.data.isFollowing);
      setFollowersCount(prev => response.data.isFollowing ? prev + 1 : prev - 1);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const isOwnProfile = currentUser?.id === profileUser?._id;

  return (
    <div className="card-instagram p-4 mb-4">
      <div className="row align-items-center">
        <div className="col-auto">
          <img
            src={profileUser?.profilePicture}
            alt={profileUser?.username}
            className="profile-picture-large"
          />
        </div>
        <div className="col">
          <div className="d-flex align-items-center mb-3">
            <h2 className="mb-0 me-3">{profileUser?.username}</h2>
            {isOwnProfile ? (
              <Link to="/profile/edit" className="btn btn-outline-instagram">
                Edit Profile
              </Link>
            ) : (
              <button
                className={`follow-button ${isFollowing ? 'following' : ''}`}
                onClick={handleFollow}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            )}
          </div>

          <div className="d-flex mb-3">
            <div className="me-4">
              <strong>{profileUser?.posts?.length || 0}</strong> posts
            </div>
            <div className="me-4">
              <strong>{followersCount}</strong> followers
            </div>
            <div>
              <strong>{profileUser?.following?.length || 0}</strong> following
            </div>
          </div>

          <div>
            <div className="fw-bold">{profileUser?.fullName}</div>
            {profileUser?.bio && (
              <div className="text-muted-instagram">{profileUser.bio}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
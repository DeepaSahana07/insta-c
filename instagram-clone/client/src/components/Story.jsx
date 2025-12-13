import React from 'react';

const Story = ({ user, isOwn = false }) => {
  return (
    <div className="text-center me-3">
      <div className="story-circle">
        <img
          src={user.profilePicture}
          alt={user.username}
          className="story-image"
        />
      </div>
      <div className="mt-1">
        <small className="text-muted-instagram">
          {isOwn ? 'Your story' : user.username}
        </small>
      </div>
    </div>
  );
};

export default Story;
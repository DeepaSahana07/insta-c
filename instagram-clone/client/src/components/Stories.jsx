import React from 'react';
import { fakeUsers, currentUser } from '../services/fakeData';

const Stories = () => {
  const allUsers = [currentUser, ...fakeUsers];

  return (
    <div className="stories-container">
      <div className="stories-scroll">
        {allUsers.map((user, index) => (
          <div key={user.id} className="story-item">
            <div className="story-ring">
              <img
                src={user.profilePicture}
                alt={user.username}
                className="story-avatar"
              />
            </div>
            <span className="story-username">
              {index === 0 ? 'Your story' : user.username}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;
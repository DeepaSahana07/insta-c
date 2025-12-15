import React, { useState, useEffect } from 'react';
import { currentUser } from '../services/fakeData';
import freeApiService from '../services/freeApiService';

const Stories = () => {
  const [users, setUsers] = useState([currentUser]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const apiUsers = await freeApiService.getUsers(8);
        setUsers([currentUser, ...apiUsers]);
      } catch (error) {
        setUsers([currentUser]);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="stories-container">
      <div className="stories-scroll">
        {users.map((user, index) => (
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
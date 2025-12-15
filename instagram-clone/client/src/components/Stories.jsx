import React, { useState, useEffect } from 'react';
import freeApiService from '../services/freeApiService';
import { useAuth } from '../context/AuthContext';

const Stories = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const apiUsers = await freeApiService.getUsers(8);
        const allUsers = user ? [user, ...apiUsers] : apiUsers;
        setUsers(allUsers);
      } catch (error) {
        setUsers(user ? [user] : []);
      }
    };
    fetchUsers();
  }, [user]);

  return (
    <div className="stories-container">
      <div className="stories-scroll">
        {users.map((user, index) => (
          <div key={user.id} className="story-item">
            <div className="story-ring">
              <img
                src={user.profilePicture || user.avatar || '/src/assets/user1.jpg'}
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
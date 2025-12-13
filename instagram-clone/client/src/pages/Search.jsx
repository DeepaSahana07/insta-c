import React, { useState } from 'react';
import { fakeUsers, fakePosts } from '../services/fakeData';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('top');

  const filteredUsers = fakeUsers.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-content">
      <div className="feed-container">
        <div className="search-container p-4">
          <div className="search-input-container mb-4">
            <input
              type="text"
              className="form-control form-control-instagram"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {searchTerm ? (
            <div className="search-results">
              <h6 className="mb-3">Users</h6>
              {filteredUsers.map(user => (
                <div key={user.id} className="d-flex align-items-center mb-3">
                  <img
                    src={user.profilePicture}
                    alt={user.username}
                    className="rounded-circle me-3"
                    style={{width: '44px', height: '44px'}}
                  />
                  <div>
                    <div className="fw-bold">{user.username}</div>
                    <div className="text-muted small">{user.fullName}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-search" style={{fontSize: '64px', color: 'var(--text-secondary)'}}></i>
              <h5 className="mt-3">Search for users and content</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
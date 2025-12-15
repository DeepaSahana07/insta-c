import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Search = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    // Load all registered users except current user
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    setAllUsers(registeredUsers.filter(u => u._id !== user?._id));
  }, [user]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = allUsers.filter(u => 
        u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.fullName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, allUsers]);

  return (
    <div className="main-content">
      <div className="search-container">
        <div className="search-header">
          <div className="search-input-container">
            <i className="bi bi-search search-icon"></i>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button 
                className="clear-search"
                onClick={() => setSearchQuery('')}
              >
                <i className="bi bi-x-circle-fill"></i>
              </button>
            )}
          </div>
        </div>

        <div className="search-results">
          {searchQuery.trim() ? (
            searchResults.length > 0 ? (
              <div className="search-results-list">
                <h6 className="search-results-title">Users</h6>
                {searchResults.map(searchUser => (
                  <Link 
                    key={searchUser._id}
                    to={`/profile/${searchUser.username}`}
                    className="search-result-item"
                  >
                    <img
                      src={searchUser.profilePicture}
                      alt={searchUser.username}
                      className="search-result-avatar"
                      onError={(e) => {
                        e.target.src = `https://i.pravatar.cc/150?u=${searchUser.username}`;
                      }}
                    />
                    <div className="search-result-info">
                      <div className="search-result-username">{searchUser.username}</div>
                      <div className="search-result-fullname">{searchUser.fullName}</div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <p>No users found for "{searchQuery}"</p>
              </div>
            )
          ) : (
            <div className="search-suggestions">
              <h6>Recent searches</h6>
              <p className="search-placeholder">Try searching for people, hashtags, or places</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
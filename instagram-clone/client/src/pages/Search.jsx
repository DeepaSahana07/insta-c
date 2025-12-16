import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';

const Search = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const searchUsers = async () => {
      if (searchQuery.trim()) {
        try {
          const response = await apiService.searchUsers(searchQuery);
          const filteredUsers = response.data.users.filter(u => u._id !== user?.id);
          setSearchResults(filteredUsers);
        } catch (error) {
          console.error('Search error:', error);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
      }
    };

    const debounceTimer = setTimeout(searchUsers, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, user]);

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
                <h6 className="search-results-title text-gray-900 dark:text-white">Users</h6>
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
                      <div className="search-result-username text-gray-900 dark:text-white">{searchUser.username}</div>
                      <div className="search-result-fullname text-gray-600 dark:text-gray-300">{searchUser.fullName}</div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <p className="text-gray-900 dark:text-white">No users found for "{searchQuery}"</p>
              </div>
            )
          ) : (
            <div className="search-suggestions">
              <h6 className="text-gray-900 dark:text-white">Recent searches</h6>
              <p className="search-placeholder text-gray-600 dark:text-gray-300">Try searching for people, hashtags, or places</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;